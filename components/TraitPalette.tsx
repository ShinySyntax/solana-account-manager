"use client"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Image, { StaticImageData } from "next/image"
import { useAccount } from "wagmi"

import { Container, H1, H3, Button } from "./common"
import { traits } from "../constants"
import { backgrounds, bases, restrict } from "../constants/image"
import { base } from "viem/chains"

const TraitPaletteContainer = styled(Container)({
    position: "relative",
    justifyContent: "center",
    width: "600px",
    minWidth: "500px",
    backgroundColor: "#000000",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"
})

const TraitThumbnail = styled(Image)({
    width: "100%",
    height: "100%"
})

const TraitButton = styled(Button)<{ active?: boolean }>(({ active }) => ({
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: "50px",
    minWidth: "50px",
    height: "auto",
    padding: "0px",
    cursor: "pointer",
    border: "none",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: active ? "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px" : "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
}))

const TraitsContainer = styled(Container)({
    width: "500px",
    overflowX: "auto",
    gap: "10px",
    padding: "5px",
    "&::-webkit-scrollbar": {
        height: "10px"
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: "10px"
    }
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

interface TraitPalettePropType {
    onTraitSelect: (traitIndex: number, itemIndex: number, item: StaticImageData) => void
}

const TraitPalette: React.FC<TraitPalettePropType> = ({ onTraitSelect }) => {
    const { isConnected } = useAccount()

    const [activeItemInTraits, setActiveItemInTraits] = useState<{ [key: number]: number }>()
    const [traitList, setTraitList] = useState<Array<{ name: string, items: Array<StaticImageData> }>>([])
    const [backgroundList, setBackgroundList] = useState<{ name: string, items: Array<StaticImageData>}>({ name: '',  items: [] })
    const [baseList, setBaseList] = useState<{ name: string, items: Array<StaticImageData> }>({ name: '', items: [] })

    const [backgroundIndex, setBackgroundIndex] = useState<number>(0)
    const [baseIndex, setBaseIndex] = useState<number>(0)

    const handleBackgroundSelection = (traitIndex: number, itemIndex: number, item: StaticImageData) => {
        setBackgroundIndex(itemIndex)
        onTraitSelect(traitIndex, itemIndex, item)
    }

    const handleBaseSelection = (traitIndex: number, itemIndex: number, item: StaticImageData) => {
        setBaseIndex(itemIndex)
        onTraitSelect(traitIndex, itemIndex, item)
    }

    const handleTraitSelection = (traitIndex: number, itemIndex: number, item: StaticImageData) => {
        setActiveItemInTraits({ ...activeItemInTraits, [traitIndex]: itemIndex })
        onTraitSelect(traitIndex, itemIndex, item)
    }

    useEffect(() => {
        onTraitSelect(0, 0, backgrounds.items[0])
        onTraitSelect(1, 0, bases.items[0])
        traits.forEach((trait, index) => {
            onTraitSelect(index + 2, 0, trait.items[0][0])
        })
        console.log("changed1")
    }, [])

    useEffect(() => {
        traits.forEach((trait, index) => {
            onTraitSelect(index + 2, 0, trait.items[baseIndex][0])
        })
        // initTraits(0)
        setActiveItemInTraits({
            2: 0,
            3: 0,
            4: 0,
            5: 0
        })
        console.log("changed2")
    }, [onTraitSelect, baseIndex])

    useEffect(() => {
        const preTraits: Array<{ name: string, items: Array<StaticImageData> }> = []
        traits.forEach((trait, index) => {
            preTraits.push({ name: trait.name, items: trait.items[baseIndex] })
        })
        setTraitList(preTraits)
        console.log("changed3")
    }, [baseIndex])

    useEffect(() => {
        setBackgroundList(backgrounds)
        setBaseList(bases)

        console.log("changed4")
    }, [])

    return (
        <TraitPaletteContainer className="flex flex-col">
            <Container className="flex w-full justify-center">
                <H1 className="font-[ComicSans] text-[20px] text-[white]">RECRUITMENT FORM</H1>
            </Container>
            <Container className="rounded-lg bg-[#0D3043]">
                {
                    <Container className="flex flex-col px-[10px] py-[10px]">
                        <Container className="flex">
                            <H3 className="font-[ComicSans] text-[20px] text-white" >{backgrounds.name}</H3>
                        </Container>
                        <TraitsContainer className="flex traits-container" style={{ width: "500px", overflowX: "auto", gap: "10px", padding: "5px" }}>
                            {
                                backgroundList.items.map((item, item_index) =>
                                    <TraitButton key={item_index} active={backgroundIndex === item_index} onClick={() => handleBackgroundSelection(0, item_index, item)}>
                                        <TraitThumbnail alt="thumbnail image" key={item_index} src={item} />
                                    </TraitButton>
                                )
                            }
                        </TraitsContainer>
                    </Container>
                }
                {
                    <Container className="flex flex-col px-[10px] py-[10px]">
                        <Container className="flex">
                            <H3 className="font-[ComicSans] text-[20px] text-white" >{bases.name}</H3>
                        </Container>
                        <TraitsContainer className="flex traits-container" style={{ width: "500px", overflowX: "auto", gap: "10px", padding: "5px" }}>
                            {
                                baseList.items.map((item, item_index) =>
                                    <TraitButton key={item_index} active={baseIndex === item_index} onClick={() => handleBaseSelection(1, item_index, item)}>
                                        <TraitThumbnail alt="thumbnail image" key={item_index} src={item} />
                                    </TraitButton>
                                )
                            }
                        </TraitsContainer>
                    </Container>
                }
                {
                    traitList.map((item, trait_index) =>
                        <Container key={trait_index} className="flex flex-col px-[10px] py-[10px]">
                            <Container className="flex">
                                <H3 className="font-[ComicSans] text-[20px] text-white" >{item.name}</H3>
                            </Container>
                            <TraitsContainer className="flex traits-container" style={{ width: "500px", overflowX: "auto", gap: "10px", padding: "5px" }}>
                                {
                                    item.items.map((item, item_index) =>
                                        <TraitButton key={item_index} active={activeItemInTraits && activeItemInTraits[trait_index + 2] === item_index} onClick={() => handleTraitSelection(trait_index + 2, item_index, item)}>
                                            <TraitThumbnail alt="thumbnail image" key={item_index} src={item} />
                                        </TraitButton>
                                    )
                                }
                            </TraitsContainer>
                        </Container>
                    )
                }
            </Container>
            <OverlayContainer active={!isConnected} draggable={false} >
                <Image alt="restricted" src={restrict} />
            </OverlayContainer>
        </TraitPaletteContainer>
    )
}

export default TraitPalette