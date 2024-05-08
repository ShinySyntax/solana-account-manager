// ** import background traits
import BG_1 from "../../assets/traits/background/blue.png"
import BG_2 from "../../assets/traits/background/dark blue.png"
import BG_3 from "../../assets/traits/background/pink.png"
import BG_4 from "../../assets/traits/background/yellow.png"

// ** import base traits
import Base from "../../assets/traits/base/base.png"

// ** import body traits
import Body from "../../assets/traits/body/base.png"
import BigCandle from "../../assets/traits/body/BIG candle.png"
import CryHands from "../../assets/traits/body/cry hands.png"
import Drink from "../../assets/traits/body/drink.png"
import Okay from "../../assets/traits/body/Okay.png"
import RedCandle from "../../assets/traits/body/red candle.png"
import Smoke from "../../assets/traits/body/smoke.png"

// ** import eyes traits
import AngryEye from "../../assets/traits/eyes/angry.png"
import BaseEye from "../../assets/traits/eyes/base.png"
import HeardEye from "../../assets/traits/eyes/heard.png"
import ShokEye from "../../assets/traits/eyes/shok.png"
import SmokeEye from "../../assets/traits/eyes/smoke.png"
import TiredEye from "../../assets/traits/eyes/tired.png"

// ** import mouse traits
import AngryMouse from "../../assets/traits/mouse/angry.png"
import BaseMouse from "../../assets/traits/mouse/base.png"
import BigSmileMouse from "../../assets/traits/mouse/big smile.png"
import KissMouse from "../../assets/traits/mouse/kiss.png"
import ScreamMouse from "../../assets/traits/mouse/scream.png"
import SmokeMouse from "../../assets/traits/mouse/smoke.png"
import WutMouse from "../../assets/traits/mouse/wut.png"

const traits = [
    {
        trait: "background",
        name: "Background",
        items: [BG_1, BG_2, BG_3, BG_4]
    },
    {
        trait: "base",
        name: "Base",
        items: [Base]
    },
    {
        trait: "body",
        name: "Body",
        items: [Body, BigCandle, CryHands, Drink, Okay, RedCandle, Smoke]
    },
    {
        trait: "eyes",
        name: "Eyes",
        items: [AngryEye, BaseEye, HeardEye, ShokEye, SmokeEye, TiredEye]
    },
    {
        trait: "mouse",
        name: "Mouse",
        items: [AngryMouse, BaseMouse, BigSmileMouse, KissMouse, ScreamMouse, SmokeMouse, WutMouse]
    }
]


export default traits