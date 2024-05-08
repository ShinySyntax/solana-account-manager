import React from "react"
import styled from "styled-components"

import { Container, Input, H3 } from "./common"

interface InputBoxPropType {
    label: string
}

const InputBox: React.FC<InputBoxPropType> = ({ label }) => {
    return (
        <Container className="flex w-[350px] bg-[white] py-[5px] px-[10px] rounded-lg">
            <H3 className="flex font-[ComicSans] font-bold">{ label }</H3>
            <Input className="flex w-full mx-[10px] font-[ComicSans] bg-[#f0f0f0] h-[25px] rounded-md px-[10px]" />
        </Container>
    )
}

export default InputBox