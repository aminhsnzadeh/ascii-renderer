import {useEffect, useRef} from "react";

interface asciiProps {
    image: string;
    resolution?: number;
    width?: number,
    height?: number
}

export default function ASCII({ image, resolution, width, height }: asciiProps) {

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const preRef = useRef<HTMLPreElement | null>(null)

    const ramp = '       _.,-=+:;cba!?0123456789$W#@Ñ'
    const rampLength = ramp.length
    const finalResolution = resolution || 64

    const toGrayScale = (r: number, g: number, b: number) => 0.21 * r + 0.72 * g + 0.07 * b;
    const getCharForPixels = (pixel: number) => ramp[Math.ceil((rampLength - 1) * pixel / 255)]

    useEffect(() => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = image

        img.onload = () => {
            const canvas = canvasRef.current
            if(canvas) {
                const ctx = canvas.getContext("2d", {
                    willReadFrequently: true,
                })

                canvas.width = finalResolution
                canvas.height = finalResolution

                ctx?.drawImage(img, 0, 0, finalResolution, finalResolution)

                const imgData = ctx?.getImageData(0, 0, finalResolution, finalResolution)

                const pixels = []

                if(imgData) {
                    for(let i = 0; i < imgData.data.length; i += 4) {
                        const r = imgData.data[i + 0] || 0
                        const g = imgData.data[i + 1] || 0
                        const b = imgData.data[i + 2] || 0

                        const pixel = toGrayScale(r, g, b)
                        imgData.data[i] = imgData.data[i + 1] = imgData.data[i + 2] = pixel

                        pixels.push(pixel)
                    }

                    ctx?.putImageData(imgData, 0, 0)

                    if(preRef.current) {
                        const drawAscii = (pixels: number[], width: number) => {
                            const ascii = pixels.reduce((asciiImage, pixel, index) => {
                                let nextChars = getCharForPixels(pixel)

                                if ((index + 1) % width === 0) {
                                    nextChars += '\n'
                                }

                                return asciiImage + nextChars;
                            }, '')

                            return ascii
                        }
                        preRef.current.textContent = drawAscii(pixels, finalResolution)
                    }
                }
            }
        }


        img.onerror = () => {
            console.log("Image cannot be loaded")
        }

    }, [image])

    return (
        <>
            <canvas ref={canvasRef} style={{width: width + "px", height: height + "px"}} />
            <pre ref={preRef} />
        </>
    )
}