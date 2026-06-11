import Image from "next/image"

interface CloudTitleProps {
  title: string
  className?: string
  imageClassName?: string
  textClassName?: string
}

export function CloudTitle({
  title,
  className = "",
  imageClassName = "w-[300px] md:w-[400px] lg:w-[500px] h-auto",
  textClassName = "text-7xl md:text-8xl lg:text-8xl font-manjari font-[1000] tracking-[0.005em] text-true-orange-medium mt-8 md:mt-14",
}: CloudTitleProps) {
  return (
    <div className={`flex justify-center pt-8 pb-8 ${className}`}>
      <div className="relative">
        <Image
          src="/images/cloud.png"
          alt=""
          width={500}
          height={250}
          className={imageClassName}
          priority
        />
        <h2 className={`absolute inset-0 flex items-center justify-center font-manjari font-[1000] tracking-[0.005em] ${textClassName}`}>
          {title}
        </h2>
      </div>
    </div>
  )
}
