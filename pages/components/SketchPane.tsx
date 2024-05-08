import React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

import { Container, H3 } from "./common";

const SketchPane = () => {
    return (
        <Container className="flex flex-col w-[350px] bg-[white] py-[5px] px-[10px] rounded-lg">
            <H3 className="flex font-[ComicSans] font-bold">Signature</H3>
            <ReactSketchCanvas
                className="flex"
                style={{  
                    borderRadius: '30px',
                    width: 'auto',
                    height: 'auto',
                    backgroundColor: '#F0F0F0'
                }}
                width="350px"
                height="200px"
                strokeWidth={4}
                strokeColor="#000000"
                canvasColor="#F0F0F0"
            />
        </Container>
    )
}

export default SketchPane