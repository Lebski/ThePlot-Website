import { useState, useEffect } from 'react';
// icons
import menuIcon from '@iconify/icons-carbon/menu';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Stack, Typography, Button } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../src/config';
// _data
import { _faqsSupport } from '../_data/mock';
// layouts
import Layout from '../src/layouts';
// components
import { Iconify, Page } from '../src/components';
import contract from './TheKnot.json';
import { ethers } from 'ethers';




const contractAddress = "0x2D226F3De543D91455f9153B41fC61373Cda963b";

const abi = contract.abi;

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: HEADER_MOBILE_HEIGHT,
    [theme.breakpoints.up('md')]: {
        paddingTop: HEADER_DESKTOP_HEIGHT,
    },
}));

// ----------------------------------------------------------------------

export default function TestPage() {
    const [topic, setTopic] = useState('Payment');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(null);


    const checkWalletIsConnected = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make sure you have Metamask installed!")
            return
        } else {
            console.log("Wallet exists!");
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account: ", account);
            setCurrentAccount(account);
        } else {
            console.log("No authorized account found");
        }
    }

    const connectWalletHandler = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            alert("Please install Metamask!");
        }

        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            console.log("Found an account! Address: ", accounts[0])
            setCurrentAccount(accounts[0]);
        } catch (err) {
            console.log(err)
        }
    }

    const getNftHandler = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                console.log("Ethereum object does not exist");
                return;
            }

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const nftContract = new ethers.Contract(contractAddress, abi, signer)

            console.log("Loading NFT");
            let nftTxn = await nftContract.tokenURI(1);

            console.log(nftTxn);

        } catch (err) {
            console.log(err)
        }

    }

    const connectWalletButton = () => {
        return (
            <Button onClick={connectWalletHandler} >
                Connect Wallet
            </Button>
        )
    }

    const getNftButton = () => {
        return (
            <Button onClick={getNftHandler} >
                Load NFT
            </Button>
        )
    }

    useEffect(() => {
        checkWalletIsConnected();
    }, [])

    useEffect(() => {
        if (mobileOpen) {
            setMobileOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topic]);

    return (
        <Page title="Support">
            <RootStyle>


                <Container>
                    <Typography
                        variant="h2"
                        sx={{
                            py: { xs: 3, md: 10 },
                        }}
                    >
                        Connect &  Draw
                    </Typography>


                    <div>
                        {currentAccount ? getNftButton() : connectWalletButton()}

                    </div>


                    <Stack
                        direction="row"
                        sx={{
                            pb: { xs: 10, md: 15 },
                        }}
                    ></Stack>
                </Container>
            </RootStyle>
        </Page>
    );
}

// ----------------------------------------------------------------------

TestPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
