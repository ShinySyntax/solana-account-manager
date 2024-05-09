"use client"
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { StaticImageData } from "next/image";
import { createClient } from "@vercel/kv";
import { useAccount } from "wagmi";
import { ToastContainer, toast } from "react-toastify"

import styles from "../styles/Home.module.css";
import 'react-toastify/dist/ReactToastify.css';

import { TraitPalette, SketchPane, CustomConnectButton } from "../components";
import { Container, Canvas, Button, H1 } from "../components/common"
import InputBox from "../components/Input";

const HomePageContainer = styled(Container)({
    display: "flex",
    padding: "10px",
    justifyContent: "center",
    gap: "10%"
})

const NFTCanvas = styled(Canvas)({
    display: "flex",
    width: "300px",
    height: "300px",
    borderRadius: "10px"
})

const NFTCanvasContainer = styled(Container)({
    display: "flex",
    gap: "20px",
    backgroundColor: "#0D3043",
    padding: "30px",
    borderRadius: "10px"
})

const NFTDownloadButton = styled(Button)({
    paddingTop: "10px",
    paddingBottom: "10px",
    background: "#d7e600",
    border: "none",
    color: "#ffffff",
    boxShadow: "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
    cursor: "pointer"
})

const PageButton = styled(Button)({
    fontFamily: 'ComicSans',
    fontWeight: 'bold',
    fontSize: '22px',
    border: '5px solid #000000',
    textAlign: 'center'
})

const OverlayContainer = styled(Container)<{ active?: boolean }>(({ active }) => ({
    display: active ? "flex" : "none",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    borderRadius: "10px",
    zIndex: 2,
    color: "#ffffff"
}))

declare global {
    interface Window {
        ethereum?: any
    }
}

export default function Home() {
    const CANVAS_WIDTH = 1000
    const CANVAS_HEIGHT = 1000

    const { address, isConnected } = useAccount()

    const canvas = useRef<HTMLCanvasElement>(null)
    const [context, setContext] = useState<CanvasRenderingContext2D | null>()

    const [traits, setTraits] = useState<Array<{ traitIndex: number, itemIndex: number, item: StaticImageData }>>([])

    const [downloadAllowed, setDownloadAllowed] = useState<boolean>(false)
    const [submitAllowed, setSubmitAllowed] = useState<boolean>(false)
    const [generating, setGnerating] = useState<boolean>(false)


    const kv = createClient({
        url: process.env.NEXT_PUBLIC_KV_REST_API_URL as string,
        token: process.env.NEXT_PUBLIC_KV_REST_API_TOKEN as string
    })

    const handleSubmit = async () => {
        if(!submitAllowed) {
            toast.error("You already minted.")
            return
        }

        if(address) {
            try {
                const image = canvas.current?.toDataURL('image/png')
                const response = await kv.set(address, {
                    minted: true,
                    image
                })

                setDownloadAllowed(true)
                toast.success("Now you are allowed to download.")
                console.log(response)
            }
            catch(error) {
                console.error(error)
            }
        }
        else {
            toast.error("Must connect wallet.")
        }
    }

    const triggerOverlay = () => {
        setGnerating(true)
        setTimeout(() => {
            setGnerating(false)
        }, 3000)
    }

    const onTraitSelect = (traitIndex: number, itemIndex: number, item: StaticImageData) => {
        const preTraits = traits
        preTraits[traitIndex] = { traitIndex, itemIndex, item }
        setTraits(preTraits)

        context?.clearRect(0, 0, canvas.current?.width || CANVAS_WIDTH, canvas.current?.height || CANVAS_HEIGHT)

        setGnerating(true)
        drawCanvas(traits, 0)
        setGnerating(false)
    }

    const drawCanvas = (traits: Array<{ traitIndex: number, itemIndex: number, item: StaticImageData }>, index: number) => {
        const image = new Image()
        image.src = traits[index].item.src
        image.onload = () => {
            context?.drawImage(image, 0, 0, canvas.current?.width || CANVAS_WIDTH, canvas.current?.height || CANVAS_HEIGHT)
            if (index < traits.length - 1) {
                drawCanvas(traits, index + 1)
            }
        }
    }

    const downloadImage = () => {
        if(!downloadAllowed) {
            toast.error("Please submit first.")
            return
        }

        const url = canvas.current?.toDataURL('image/png')
        const link = document.createElement('a')
        link.download = "nft-collection.png"
        link.href = url || ""
        link.click()

        setSubmitAllowed(false)
        setDownloadAllowed(false)
    }

    useEffect(() => {
        if (canvas) {
            setContext(canvas.current?.getContext('2d'))
        }
    }, [canvas])

    useEffect(() => {
        (async () => {
            try {
                if(address) {
                    const response = await kv.get(address)

                    console.log(response)

                    if(!!!response) {
                        setSubmitAllowed(true)
                    }
                    else {
                        setSubmitAllowed(false)
                    }
                }
            }
            catch(error) {
                console.error(error)
            }
        })()
    }, [address])

    return (
        <main className={styles.main}>
            <div className="flex gap-[100px]">
                <Container className="flex">
                    <TraitPalette onTraitSelect={(traitIndex, itemIndex, item) => {onTraitSelect(traitIndex, itemIndex, item)} } />
                </Container>
                <Container className="flex flex-col gap-[20px]">
                    <Container className="flex bg-[#000000] px-[10px] py-[10px] rounded-lg h-fit">
                        <Container className="flex flex-col">
                            <NFTCanvasContainer className="flex bg-[#0D3043]">
                                <Container className="flex relative">
                                    <OverlayContainer active={generating} className="backdrop-blur-lg" />
                                    <NFTCanvas ref={canvas} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
                                </Container>
                                <Container className="flex flex-col gap-[10px]">
                                    <InputBox label="Name" />
                                    <InputBox label="Age" />
                                    <InputBox label="Gender" />
                                    <SketchPane />
                                </Container>
                            </NFTCanvasContainer>
                            <Container className="flex justify-center py-[10px]">
                                <H1 className="flex text-white font-[ComicSans] font-[22px]">
                                    123
                                </H1>
                            </Container>
                        </Container>
                    </Container>
                    <Container className="flex h-full flex-col justify-between justify-items-stretch">
                        <Container className="flex">
                            {/* <PageButton className="bg-[#F5AE45] w-full rounded-lg px-[10px] py-[15px]">
                                Connect Wallet
                            </PageButton> */}
                            <CustomConnectButton />
                        </Container>
                        <Container className="flex gap-[10px]">
                            <Container className="flex w-full">
                                <PageButton onClick={handleSubmit} className="bg-[#F5AE45] w-full rounded-lg px-[10px] py-[15px]">
                                    Submit
                                </PageButton>
                            </Container>
                            <Container className="flex w-full">
                                <PageButton onClick={downloadImage} className="bg-[#ffffff] w-full rounded-lg px-[10px] py-[15px] bg-opacity-60">
                                    Download
                                </PageButton>
                            </Container>
                        </Container>
                    </Container>
                </Container>
                <ToastContainer />
            </div>
        </main>
    );
}