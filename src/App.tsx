import useAscii from "./useAscii";
import {useControls} from "leva";

type options = {
    gamma?: number
    ramp?: any
    customRamp?: string //use custom ramp OR choose one of exist ramp
    width?: number
    height?: number
    invert?: boolean
    extraSpace?: number
}

function App() {

    const { ramp, invert, customRamp, height, width, extraSpace, gamma }: options = useControls({
        ramp: {
            options: ["bold", "detailed", "classic", "minimal"],
            value: "classic"
        },
        invert: false,
        customRamp: "",
        width: 64,
        height: 64,
        extraSpace: {
            min: 0,
            max: 10,
            value: 0,
            step: 1
        },
        gamma: {
            min: 0,
            max: 3,
            value: 1,
            step: 0.1
        },
    })

    const ascii = useAscii({
        image: "/flower.webp",
        ramp,
        invert,
        customRamp,
        extraSpace,
        gamma,
        height,
        width
    });

    return (
        <>
            <pre>{ascii}</pre>
        </>
    )
}

export default App
