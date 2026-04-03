# String Query Validation

```typescript
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Link, useSearchParams, useLocation } from 'react-router-dom'


interface ColorVariants { blue: string, white:string, black:string}
const colorVariants = ['blue', 'white', 'black']

const sizeVariants = ['XS', 'S', 'MD', 'L', 'XL']

const imgsUrls: ColorVariants = {
    black: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1200&q=75',
    white: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-2.png%3Fv%3D1689798965&w=828&q=75',
    blue: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-circles-blue.png%3Fv%3D1690003396&w=828&q=75',
}

const Page: React.FC = () => {
  const [searchParams] = useSearchParams()
  const location = useLocation();
  // default values
  let selectedColor: string = 'black'
  let selectedSize : string = 'MD'

  for (const entry of searchParams.entries()) {
    const [param, value] = entry
    if(param === 'color'){
      selectedColor = value
    }
    else if(param === 'size'){
      selectedSize = value
    }
  }

// useEffect(() => {
//   window.history.pushState(null, "", `?color=${selectedColor}&size=${selectedSize}`)


// }, [selectedColor, selectedSize]);

    return (
        <div className='flex flex-col items-center m-auto gap-2'>
            <img src={imgsUrls[selectedColor as keyof ColorVariants]} alt="" className='w-64' />
            <div className='flex gap-2'>
              {colorVariants.map((color, index) => (
                  <Link key={index} to={`${location.pathname}?${new URLSearchParams({color, size: selectedSize})}`} className={`border-2 rounded-2xl py-2 px-4
                  ${selectedColor === color
                    ? 'border-blue-500'
                    : 'border-gray-300'}`}
                    >
                      {color}
                  </Link>
              ))}
            </div>

            <div className='flex gap-2'>
              {sizeVariants.map((size, index) => (
                  <Link key={index} to={`${location.pathname}?color=${selectedColor}&size=${size}`} className={`border-2 rounded-ful py-2 px-4
                  ${selectedSize === size
                    ? "border-blue-500"
                    : "border-gray-300"}`} >{size}</Link>
              ))}
            </div>
            <div>
              {/* <p>Color: {selectedColor}</p>
              <p>Size: {selectedSize}</p> */}
            </div>
        </div>
    )
}
export { Page }


```
