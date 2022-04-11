import { useState, useEffect } from 'react';
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
import { Iconify, Page } from '../src/components';
import { RootStyle } from '../src/components/Markdown';
import logo from '../public/nft/img/test.jpg';


export function Knight() {
    return <span>♘</span>
}

export default function TestPage() {
    const [topic, setTopic] = useState('Payment');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [xCoord, setXCoord] = useState(0);
    const [yCoord, setYCoord] = useState(0);

    const squareSize = 60
    const maxWidth = 300
    const maxHeight = 300


    useEffect(() => {
        if (mobileOpen) {
            setMobileOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topic]);

    const onMouseMove = (e) => {

        const offsetX = e.nativeEvent.offsetX
        const offsetY = e.nativeEvent.offsetY

        if (offsetX + squareSize / 2 >= maxWidth) {
            setXCoord(maxWidth - squareSize / 2)
        }
        else if (offsetX - squareSize <= 0) {
            setXCoord(squareSize / 2)
        } else {
            setXCoord(offsetX)
        }

        if (offsetY + squareSize / 2 >= maxHeight) {
            setYCoord(maxHeight - squareSize / 2)
        }
        else if (offsetY - squareSize <= 0) {
            setYCoord(squareSize / 2)
        } else {
            setYCoord(offsetY)
        }

    }

    const selector = () => {
        const xPx = (xCoord - squareSize / 2) + "px";
        const yPx = (yCoord - squareSize / 2) + "px";
        const squareValue = squareSize + "px";
        const squareColor = 'black';

        return <img

            src={'../nft/img/canvas_res.svg'}
            style={{
                position: 'absolute',
                top: yPx,
                left: xPx,
                width: squareValue,
                height: squareValue
            }}>
        </img>

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
                    Mouse coordinates: {xCoord} {yCoord}
                </Typography>

                <div

                    onMouseDown={onMouseMove.bind(this)}
                    style={{
                        color: 'stroke',
                        width: maxWidth + 'px',
                        height: maxHeight + 'px',
                        position: 'relative'
                    }}
                >
                    <img src={'../nft/img/canvas.jpeg'} style={{ width: '100%', height: '100%' }} />
                    {selector()}

                </div>


            </Container>
        </RootStyle >
    );
}

// ----------------------------------------------------------------------

TestPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
