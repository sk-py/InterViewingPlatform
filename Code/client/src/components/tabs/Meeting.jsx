import * as React from "react"
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"
import { useParams } from "react-router-dom"
import useAppContext from "@/hooks/useAppContext"

export default function App({ visibility }) {
    const roomID = useParams()
    const { currentUser } = useAppContext()

    console.log(roomID.roomId)
    let myMeeting = async (element) => {
        // generate Kit Token
        const appID = 1442018664
        const serverSecret = "2862f8f4443d0bc3ed27a0f1d56296f9"
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomID.roomId,
            Date.now().toString(),
            currentUser.username,
        )

        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken)
        // start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: "Personal link",
                    url: `http://localhost:5174/editor/${roomID.roomId}`,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
            },
        })
    }

    return (
        <div
            className="myCallContainer"
            id="meetingContainer"
            ref={myMeeting}
            style={{
                width: "97vw",
                height: "100vh",
                position: "absolute",
                zIndex: 100,
                top: 0,
                right: 0,
                display: "block",
            }}
        ></div>
    )
}
