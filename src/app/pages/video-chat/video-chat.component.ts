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
    myStream?
    otherVid: any
    callId?: string | null
    userId
    myPeer
    activeIncomingStreamIds: string[] = []
    vidActive = true
    callJoined = false

    constructor(private route: ActivatedRoute, private api: APIService) {}

    async ngOnDestroy() {
        console.log('Destroying Peer')
        await this.myPeer.destroy()
    }

    async ngOnInit() {
        this.myVid = document.getElementById('myStream')
        this.otherVid = document.getElementById('otherStream')
        this.callId = this.route.snapshot.params.id
        try {
            from(Auth.currentAuthenticatedUser()).subscribe(async (user) => {
                this.userId = user.attributes.sub
                console.log(this.userId)
                this.myStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                })
                this.myVid.muted = true
                this.myVid.srcObject = this.myStream
                this.myVid.addEventListener('loadedmetadata', () => {
                    this.myVid.play()
                })
            })
        } catch (e) {
            console.error(e)
        }
    }

    joinCall() {
        this.myPeer = new Peer(this.userId)
        if (!!this.myPeer.id) {
            this.callJoined = true
        }

        console.log('My Peer', this.myPeer)
        this.myPeer.on('error', (err) => {
            this.callJoined = false
            console.error(err)
        })

        this.myPeer.on('call', async (call) => {
            console.log('Call Recieved', call)
            await call.answer(this.myStream)
            call.on('stream', (remoteStream) => {
                console.log('Stream received', remoteStream)
                if (!this.activeIncomingStreamIds.find((id) => id === remoteStream.id)) {
                    this.activeIncomingStreamIds = [
                        ...this.activeIncomingStreamIds,
                        remoteStream.id
                    ]

                    //incomingVideo.muted = true
                    this.otherVid.srcObject = remoteStream
                    this.otherVid.addEventListener('loadedmetadata', () => {
                        this.otherVid.play()
                    })
                }
            })
            call.on('close', () => {
                console.log('connection closed')
            })
            call.on('error', (error) => {
                console.error(error)
            })
        })

        from(this.api.GetVideoCall(this.callId!)).subscribe(async (call) => {
            console.log(call.attendeeIds)
            call.attendeeIds
                ?.filter((id) => id !== this.userId)
                .forEach(async (attendee) => {
                    console.log(attendee)
                    try {
                        console.log('myStream', this.myStream)

                        let call = await this.myPeer.call(attendee, this.myStream)
                        console.log('Call', call)
                        call.on('stream', (remoteStream) => {
                            console.log('Stream received', remoteStream)
                            if (
                                !this.activeIncomingStreamIds.find(
                                    (id) => id === remoteStream.id
                                )
                            ) {
                                this.activeIncomingStreamIds = [
                                    ...this.activeIncomingStreamIds,
                                    remoteStream.id
                                ]

                                //incomingVideo.muted = true
                                this.otherVid.srcObject = remoteStream
                                this.otherVid.addEventListener('loadedmetadata', () => {
                                    this.otherVid.play()
                                })
                            }
                        })
                        call.on('close', () => {
                            console.log('connection closed')
                        })
                        call.on('error', (error) => {
                            console.error(error)
                        })
                    } catch (e) {
                        console.error(e)
                    }
                })
        })
    }

    muteVideo() {
        const stream = this.myVid.srcObject
        const vidTrack = stream.getTracks().find((track) => track.kind === 'video')
        if (this.vidActive) {
            vidTrack.enabled = false
        } else {
            vidTrack.enabled = true
        }
        this.vidActive = !this.vidActive
    }

    muteAudio() {
        const stream = this.myVid.srcObject
        const vidTrack = stream.getTracks().find((track) => track.kind === 'audio')
        if (this.vidActive) {
            vidTrack.enabled = false
        } else {
            vidTrack.enabled = true
        }
        this.vidActive = !this.vidActive
    }

    async endCall() {
        const connections = Object.values(this.myPeer.connections)
        //connections.forEach((connection) => (connection as any).close())
        await this.myPeer.destroy()
        //console.log(this.myPeer)
    }
}
