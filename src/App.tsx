import useAscii from "./useAscii";

function App() {

    const ascii = useAscii({ image: "/flower.webp" });

    return (
        <>
            <pre>{ascii}</pre>
        </>
    )
}

export default App
