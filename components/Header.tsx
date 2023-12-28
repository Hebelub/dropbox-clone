import Link from "next/link"
import Image from "next/image";

function Header() {
  return (
    <header className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
            <div className="bg-[#0160FE] w-fit">
                <Image 
                    src="https://www.shareicon.net/download/2016/07/13/606936_dropbox_2048x2048.png" 
                    alt="logo"
                    className="Invert"
                    width={50}
                    height={50} 
                />
            </div>
            <h1 className="font-bold font-xl">Dropbox</h1>
        </Link>
    </header>
  )
}

export default Header