"use client"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Image, { StaticImageData } from "next/image"

import { Container, H1, H3, Button } from "./common"
import { traits } from "../constants"

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
    const [activeItemInTraits, setActiveItemInTraits] = useState<{ [key: number]: number }>()

    const handleTraitSelection = (traitIndex: number, itemIndex: number, item: StaticImageData) => {
        setActiveItemInTraits({ ...activeItemInTraits, [traitIndex]: itemIndex })
        onTraitSelect(traitIndex, itemIndex, item)
    }

    useEffect(() => {
        traits.forEach((trait, index) => {
            onTraitSelect(index, 0, trait.items[0])
        })
    }, [onTraitSelect])

    return (
        <TraitPaletteContainer className="flex flex-col">
            <Container className="flex w-full justify-center">
                <H1 className="font-[ComicSans] text-[20px] text-[white]">RECRUITMENT FORM</H1>
            </Container>
            <Container className="rounded-lg bg-[#0D3043]">
                {
                    traits.map((item, trait_index) =>
                        <Container key={trait_index} className="flex flex-col px-[10px] py-[10px]">
                            <Container className="flex">
                                <H3 className="font-[ComicSans] text-[20px] text-white" >{item.name}</H3>
                            </Container>
                            <TraitsContainer className="flex traits-container" style={{ width: "500px", overflowX: "auto", gap: "10px", padding: "5px" }}>
                                {
                                    item.items.map((item, item_index) =>
                                        <TraitButton key={item_index} active={ activeItemInTraits && activeItemInTraits[trait_index] === item_index } onClick={() => handleTraitSelection(trait_index, item_index, item)}>
                                            <TraitThumbnail alt="thumbnail image" key={item_index} src={item} />
                                        </TraitButton>

                                    )
                                }
                            </TraitsContainer>
                        </Container>
                    )
                }
            </Container>
        </TraitPaletteContainer>
    )
}

export default TraitPalette