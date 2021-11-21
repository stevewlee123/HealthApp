import { ActivatedRoute } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import Auth from '@aws-amplify/auth'
import Peer from 'peerjs'
import { from } from 'rxjs'
import { APIService } from 'src/app/API.service'

@Component({
    selector: 'app-video-chat',
    templateUrl: './video-chat.component.html',
    styleUrls: ['./video-chat.component.css']
})
export class VideoChatComponent implements OnInit, OnDestroy {
    myVid: any
    otherVid: any
    callId?: string | null
    userId
    myPeer
    activeIncomingStreamIds: string[] = []

    constructor(private route: ActivatedRoute, private api: APIService) {}

    ngOnDestroy() {
        this.myPeer.destroy()
    }

    ngOnInit(): void {
        this.myVid = document.getElementById('myVid')
        this.otherVid = document.getElementById('video-grid')
        this.callId = this.route.snapshot.params.id
        try {
            from(Auth.currentAuthenticatedUser()).subscribe((user) => {
                this.userId = user.attributes.sub
                console.log(this.userId)
                navigator.mediaDevices
                    .getUserMedia({ video: true, audio: true })
                    .then((stream) => {
                        const myVideo = document.createElement('video')
                        myVideo.muted = true
                        myVideo.srcObject = stream
                        myVideo.addEventListener('loadedmetadata', () => {
                            myVideo.play()
                        })
                        this.myVid.append(myVideo)
                    })
            })
        } catch (e) {
            console.error(e)
        }
    }

    joinCall() {
        this.myPeer = new Peer(this.userId)
        console.log('My Peer', this.myPeer)
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                this.myPeer.on('call', (call) => {
                    call.answer(stream)
                    call.on('stream', (remoteStream) => {
                        if (
                            !this.activeIncomingStreamIds.find(
                                (id) => id === remoteStream.id
                            )
                        ) {
                            this.activeIncomingStreamIds = [
                                ...this.activeIncomingStreamIds,
                                remoteStream.id
                            ]
                            console.log('Stream received', remoteStream)
                            const incomingVideo = document.createElement('video')
                            //incomingVideo.muted = true
                            incomingVideo.srcObject = remoteStream
                            incomingVideo.addEventListener('loadedmetadata', () => {
                                incomingVideo.play()
                            })
                            this.otherVid.append(incomingVideo)
                        }
                    })
                })

                from(this.api.GetVideoCall(this.callId!)).subscribe((call) => {
                    console.log(call.attendeeIds)
                    call.attendeeIds
                        ?.filter((id) => id !== this.userId)
                        .forEach((attendee) => {
                            console.log(attendee)
                            try {
                                let call = this.myPeer.call(attendee, stream)
                                console.log('Call', call)
                                // call.on('stream', (remoteStream) => {
                                //     const incomingVideo = document.createElement('video')
                                //     incomingVideo.muted = true
                                //     incomingVideo.srcObject = remoteStream
                                //     incomingVideo.addEventListener(
                                //         'loadedmetadata',
                                //         () => {
                                //             incomingVideo.play()
                                //         }
                                //     )
                                //     this.otherVid.append(incomingVideo)
                                // })
                            } catch (e) {
                                console.error(e)
                            }
                        })
                })
            })
    }
}
