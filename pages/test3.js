import { useState, useEffect, useRef } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Stack, Typography, Button, ImageListItem, ImageList, ImageListItemBar } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../src/config';
// _data
import { _faqsSupport } from '../_data/mock';
// layouts
import Layout from '../src/layouts';
// components
import { RootStyle } from '../src/components/Markdown';
// canvas draw
import { ReactSketchCanvas } from "react-sketch-canvas";



export default function TestPage() {
    const [topic, setTopic] = useState('Payment');
    const [mobileOpen, setMobileOpen] = useState(false);
    const saveableCanvas = useRef(null);
    useEffect(() => {
        if (mobileOpen) {
            setMobileOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topic]);

    const styles = {
        border: "0.0625rem solid #9c9c9c",
        borderRadius: "0.25rem",
    };

    const downloadCanvas = async () => {
        const data = await saveableCanvas.current.exportSvg();
        console.log(data)

    }


    return (
        <RootStyle>


            <Container>
                <Typography
                    variant="h2"
                    sx={{
                        py: { xs: 3, md: 10 },
                    }}
                >
                    Connect &  Draw <br />
                </Typography>

                <ReactSketchCanvas

                    ref={saveableCanvas}
                    style={styles}
                    width="297px"
                    height="210px"
                    strokeWidth={2}
                    strokeColor="black"
                    background="none"
                />
                <button
                    onClick={() => downloadCanvas()}
                >
                    Get Image
                </button>
            </Container>
        </RootStyle >
    );
}

// ----------------------------------------------------------------------

TestPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
