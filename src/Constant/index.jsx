
import img1 from "../../src/assets/client/client1.png"
import img2 from "../../src/assets/client/client2.png"
import img3 from "../../src/assets/client/client3.png"
import img4 from "../../src/assets/client/client4.png"

export const reviews = [
    {
        id:1,
        name:"Ema Watson",
        image:(<img
            src={img1}
            alt="client image"
            className="h-40 object-fill w-40 rounded-full border border-blue-400 "
          />),
        rating:4,
        description:"This is Amazing platform for me.thanks for the platform"
    },
    {
        id:2,
        name:"Nabila",
        image:(<img
            src={img2}
            alt="client image"
            className="h-40 object-fill w-40 rounded-full border border-blue-400 "
          />),
        rating:5,
        description:"This is Amazing platform for me.thanks for the platform"
    },
    {
        id:3,
        name:"Andrella",
        image:(<img
            src={img3}
            alt="client image"
            className="h-40 object-fill w-40 rounded-full border border-blue-400 "
          />),
        rating:4,
        description:"This is Amazing platform for me.thanks for the platform"
    },
    {
        id:4,
        name:"Jhon wick",
        image:(<img
            src={img4}
            alt="client image"
            className="h-40 object-fill w-40 rounded-full border border-blue-400 "
          />),
        rating:4,
        description:"This is Amazing platform for me.thanks for the platform"
    },
]