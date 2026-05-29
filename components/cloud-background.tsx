import Image from "next/image"

/**
 * Reusable cloud background pattern that matches the reference design.
 * Renders scattered white clouds at consistent positions.
 * Parent element must have `position: relative` and `overflow: hidden`.
 */
export function CloudBackground() {
  return (
    <>
      {/* Row 1 */}
      <Image src="/images/cloud.png" alt="" width={120} height={60} className="absolute top-[6%] left-[5%] w-[100px] h-auto opacity-90 pointer-events-none" />
      <Image src="/images/cloud.png" alt="" width={140} height={70} className="absolute top-[4%] left-[28%] w-[120px] h-auto opacity-90 pointer-events-none" />
      <Image src="/images/cloud.png" alt="" width={160} height={80} className="absolute top-[5%] left-[60%] w-[130px] h-auto opacity-90 pointer-events-none" />
      <Image src="/images/cloud.png" alt="" width={100} height={50} className="absolute top-[8%] left-[87%] w-[90px] h-auto opacity-90 pointer-events-none" />

      {/* Row 2 */}
      <Image src="/images/cloud.png" alt="" width={130} height={65} className="absolute top-[40%] left-[2%] w-[110px] h-auto opacity-90 pointer-events-none" />
      <Image src="/images/cloud.png" alt="" width={160} height={80} className="absolute top-[38%] left-[40%] w-[140px] h-auto opacity-90 pointer-events-none" />
      <Image src="/images/cloud.png" alt="" width={120} height={60} className="absolute top-[42%] left-[73%] w-[100px] h-auto opacity-90 pointer-events-none" />

      {/* Row 3 */}
      <Image src="/images/cloud.png" alt="" width={140} height={70} className="absolute top-[75%] left-[16%] w-[120px] h-auto opacity-90 pointer-events-none" />
      <Image src="/images/cloud.png" alt="" width={130} height={65} className="absolute top-[78%] left-[48%] w-[110px] h-auto opacity-90 pointer-events-none" />
      <Image src="/images/cloud.png" alt="" width={100} height={50} className="absolute top-[80%] left-[83%] w-[80px] h-auto opacity-90 pointer-events-none" />
    </>
  )
}
