import { MemberApplicationServiceResponseDto } from "@/lib/services/members/schema";
import Avatar from "./Avatar";
import ProfileLabel from "./ProfileLabel";
import { useWindowSize } from "usehooks-ts";

interface AvatarsProps {
  list: MemberApplicationServiceResponseDto[];
}

// list에 기본값 [] 설정해야 동작함
function AvatarStack({ list = [] }: AvatarsProps) {
  const { width } = useWindowSize();
  const tabletOrLarge = width >= 1199;

  const visibleCount = tabletOrLarge ? 4 : 2;
  const isVisible = list.length > visibleCount;
  const others = list.length - visibleCount;

  return (
    <div className={`relative flex group`}>
      <div className={`h-38 flex items-center -space-x-10 tablet:-space-x-8`}>
        {list.slice(0, visibleCount).map((data, index) => {
          return (
            <div key={index} className={`relative`}>
              <Avatar nickname={data.nickname} profileImageUrl={data.profileImageUrl} />
            </div>
          );
        })}
        {isVisible && (
          <div
            className={`relative flex items-center justify-center border-2 border-white rounded-full h-34 w-34 bg-[#F4D7DA] text-[#D25B68] tablet:h-38 tablet:w-38 tablet:text-16 text-14 font-medium`}>
            +{others}
          </div>
        )}
      </div>
      <div
        className={`absolute hidden border border-gray-D9D9 rounded-8 border-solid top-45 p-12 w-160 right-0 group-hover:flex-col group-hover:flex group-hover:items-start group-hover:gap-4 group-hover:flex-nowrap bg-white`}>
        {list.map((data, index) => {
          return <ProfileLabel key={index} data={data} avatarType="dropdown" />;
        })}
      </div>
    </div>
  );
}

export default AvatarStack;
