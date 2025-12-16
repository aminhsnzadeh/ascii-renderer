import ASCII from "./ascii";
import useAscii from "./useAscii";

function App() {

    const ascii = useAscii({ image: "/flower.webp", width: 64, height: 64 })

    return (
        <>
            {/*<ASCII*/}
            {/*    image={"/flower.webp"}*/}
            {/*    resolution={64}*/}
            {/*    width={512}*/}
            {/*    height={512}*/}
            {/*/>*/}

            <pre>{ascii}</pre>
        </>
    )
}

export default App
