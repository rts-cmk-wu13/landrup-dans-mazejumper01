import Image from 'next/image'


export default function Logo() {
    return (
        <div className='flex flex-col items-center justify-center h-full w-full gap-8 pt-10'>
        <Image 
          src="/assets/landrup.svg"
          width={64}
          height={64}
          alt="Landrup Dans Logo"
        />
        <Image 
        src="/assets/landrup-dans.png"
          width={291}
          height={62}
          alt="Landrup Dans Logo"
        />
      </div>
    )
}