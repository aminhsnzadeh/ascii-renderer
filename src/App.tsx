import useAscii from "./useAscii";
import {useControls} from "leva";
import useRgbAscii from "./useRgbAscii";

type options = {
    gamma?: number
    ramp?: any
    customRamp?: string //use custom ramp OR choose one of exist ramp
    width?: number
    height?: number
    invert?: boolean
    extraSpace?: number
    image?: string
    scale?: number
}

function App() {

    const { ramp, invert, customRamp, height, width, extraSpace, gamma, image, scale }: options = useControls({
        ramp: {
            options: ["bold", "detailed", "classic", "minimal"],
            value: "bold"
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
        scale: {
            min: 0.1,
            max: 1,
            value: 1,
        },
        image: {
            image: undefined
        }
    })

    //WARNING : do not use higher resolution for colored ASCII. Process is high it might blow your machine :P
    const ascii = useRgbAscii({
        image: image || "/flower.webp",
        ramp,
        invert: !invert,
        customRamp,
        extraSpace,
        gamma,
        height,
        width
    });

    // const ascii = useAscii({
    //     image: image || "/flower.webp",
    //     ramp,
    //     invert: !invert,
    //     customRamp,
    //     extraSpace,
    //     gamma,
    //     height,
    //     width
    // });

    return (
        <>
            <pre style={{fontSize: `${18 * scale}px`, lineHeight: `${10 * scale}px`}}>{ascii}</pre>
        </>
    )
}

export default App
