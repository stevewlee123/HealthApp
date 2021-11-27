const axios = require('axios')
const gql = require('graphql-tag')
const graphql = require('graphql')
var aws = require('aws-sdk')
var ses = new aws.SES({ region: 'us-east-1' })
const { v4: uuidv4 } = require('uuid')

const { print } = graphql

const createVideoCall = gql`
    mutation CreateVideoCall(
        $input: CreateVideoCallInput!
        $condition: ModelVideoCallConditionInput
    ) {
        createVideoCall(input: $input, condition: $condition) {
            id
            attendeeIds
            time
            createdAt
            updatedAt
        }
    }
`

const createCallAttendees = gql`
    mutation CreateCallAttendees(
        $input: CreateCallAttendeesInput!
        $condition: ModelCallAttendeesConditionInput
    ) {
        createCallAttendees(input: $input, condition: $condition) {
            id
            videoCallID
            userID
            videoCall {
                id
                attendeeIds
                time
                status
                attendees {
                    nextToken
                }
                createdAt
                updatedAt
            }
            user {
                id
                firstName
                lastName
                email
                type
                videoCalls {
                    nextToken
                }
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
        }
    }
`

exports.handler = async (event) => {
    const { email, id, attendeeIds, ...createCallInput } = JSON.parse(event.body)
    console.log({ id, attendeeIds, ...createCallInput })
    try {
        //create Call
        const graphqlData = await axios({
            url: process.env.API_PROJECTAPP_GRAPHQLAPIENDPOINTOUTPUT,
            method: 'post',
            headers: {
                'x-api-key': process.env.API_PROJECTAPP_GRAPHQLAPIKEYOUTPUT
            },
            data: {
                query: print(createVideoCall),
                variables: {
                    input: { id, attendeeIds, ...createCallInput }
                }
            }
        })

        console.log("Call Created:" , graphqlData)

        //Create Call Attendees
        attendeeIds.forEach(async (attendeeId) => {
            const createAttendeeInput = {
                id: uuidv4(),
                userID: attendeeId,
                videoCallID: id
            }
            const graphqlCreateAttendeeData = await axios({
                url: process.env.API_PROJECTAPP_GRAPHQLAPIENDPOINTOUTPUT,
                method: 'post',
                headers: {
                    'x-api-key': process.env.API_PROJECTAPP_GRAPHQLAPIKEYOUTPUT
                },
                data: {
                    query: print(createCallAttendees),
                    variables: {
                        input: createAttendeeInput
                    }
                }
            })
            console.log('Attendee Created:', graphqlCreateAttendeeData)
        })

        // send email
        var params = {
            Destination: {
                ToAddresses: [email]
            },
            Message: {
                Body: {
                    Text: {
                        Data: `You have a new appointment request at ${new Date(
                            createCallInput.time
                        ).toString()}`
                    }
                },

                Subject: { Data: 'You have a new appointment request.' }
            },
            Source: 'sashank.nalamati@gmail.com'
        }

        console.log(await ses.sendEmail(params).promise())

        const body = {
            message: 'successfully requested call!'
        }
        return {
            statusCode: 200,
            body: JSON.stringify(body),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    } catch (err) {
        console.log('error creating todo: ', err)
    }
}
