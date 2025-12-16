import {useEffect, useState} from "react";

interface asciiProps {
    image: string;
    resolution?: number;
    height?: number
    width?: number;
}

const useAscii = ({ image, width, height }: asciiProps) => {

    const [ascii, setAscii] = useState<string>("")

    const gammaCorrection = 1
    const ramp = '█▓▒░  '.split('').reverse().join('')
    const rampLength = ramp.length
    const MAXIMUM_WIDTH = width || 64;
    const MAXIMUM_HEIGHT = height || 64;

    const toGrayScale = (r: number, g: number, b: number) => 0.2 * r + 0.72 * g + 0.07 * b;
    const getCharForPixels = (pixel: number) => ramp[Math.ceil((rampLength - 1) * pixel)]
    const clampDimensions = (width: number, height: number): [number, number] => {
        if (height > MAXIMUM_HEIGHT) {
            const reducedWidth = Math.floor(width * MAXIMUM_HEIGHT / height)
            return [reducedWidth, MAXIMUM_HEIGHT]
        }

        if (width > MAXIMUM_WIDTH) {
            const reducedHeight = Math.floor(height * MAXIMUM_WIDTH / width)
            return [MAXIMUM_WIDTH, reducedHeight]
        }

        return [width, height]
    }


    useEffect(() => {
        const canvas = document.createElement('canvas')
        if(canvas) {
            const ctx = canvas.getContext("2d", {
                willReadFrequently: true,
            })

            const img = new Image()
            img.crossOrigin = 'anonymous'
            img.src = image

            const [width, height] = clampDimensions(img.width, img.height);

            canvas.width = width
            canvas.height = height

            ctx?.drawImage(img, 0, 0, width, height)

            const imgData = ctx?.getImageData(0, 0, width, width)

            const pixels = []

            if(imgData) {
                for(let i = 0; i < imgData.data.length; i += 4) {
                    const r = Math.pow((imgData.data[i + 0] / 255), gammaCorrection) || 0
                    const g = Math.pow((imgData.data[i + 1] / 255), gammaCorrection) || 0
                    const b = Math.pow((imgData.data[i + 2] / 255), gammaCorrection) || 0



                    const pixel = toGrayScale(r, g, b)
                    imgData.data[i] = imgData.data[i + 1] = imgData.data[i + 2] = pixel

                    pixels.push(pixel)
                }

                ctx?.putImageData(imgData, 0, 0)
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

                setAscii(drawAscii(pixels, width))
            }
        }
    }, [ascii, image, gammaCorrection])


    return ascii
}

export default useAscii