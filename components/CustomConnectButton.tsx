import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Container, Button, Image } from "./common";

const CustomConnectButton = () => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== "loading";
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus || authenticationStatus === "authenticated");

                return (
                    <Container
                        className="w-full"
                        {...(!ready && {
                            "aria-hidden": true,
                            style: {
                                opacity: 0,
                                pointerEvents: "none",
                                userSelect: "none",
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <Button
                                        className="w-full bg-[#F5AE45] w-full rounded-lg px-[10px] py-[15px] font-[ComicSans] font-bold text-[22px] border-solid border-[5px] border-black"
                                        onClick={openConnectModal}
                                        type="button"
                                    >
                                        Connect Wallet
                                    </Button>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <Button
                                        className="w-full bg-[#F5AE45] w-full rounded-lg px-[10px] py-[15px] font-[ComicSans] font-bold text-[22px] border-solid border-[5px] border-black"
                                        onClick={openChainModal}
                                        type="button"
                                    >
                                        Wrong network
                                    </Button>
                                );
                            }

                            return (
                                <Container className="flex items-center justify-center gap-3">
                                    {/* <Button onClick={openChainModal} type="button">
                                        {chain.hasIcon && (
                                            <Container className="w-6 h-6">
                                                {chain.iconUrl && (
                                                    <Image
                                                        alt={chain.name ?? "Chain icon"}
                                                        src={chain.iconUrl}
                                                        className="w-6 h-6"
                                                    />
                                                )}
                                            </Container>
                                        )}
                                    </Button> */}

                                    <Button
                                        className="w-full bg-[#F5AE45] w-full rounded-lg px-[10px] py-[15px] font-[ComicSans] font-bold text-[22px] border-solid border-[5px] border-black"
                                        onClick={openAccountModal}
                                        type="button"
                                    >
                                        {account.displayName}
                                    </Button>
                                </Container>
                            );
                        })()}
                    </Container>
                );
            }}
        </ConnectButton.Custom>
    );
};

export default CustomConnectButton;