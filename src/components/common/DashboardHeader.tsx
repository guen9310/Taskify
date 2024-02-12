import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import AvatarStack from "./AvatarStack";
import ProfileLabel from "./ProfileLabel";
import InviteModal from "../modal/invite";
import IconButton from "./Button/IconButton";
import ProfilePopover from "./Popover/Profile";
import { useMyData } from "@/layouts/board";
import { MemberApplicationServiceResponseDto } from "@/lib/services/members/schema";
import { DashboardApplicationServiceResponseDto } from "@/lib/services/comments/schema";

interface DashboardHeaderProps {
  dashboardData?: DashboardApplicationServiceResponseDto;
  members?: MemberApplicationServiceResponseDto[];
}

function DashboardHeader({ dashboardData, members }: DashboardHeaderProps) {
  const router = useRouter();
  const path = router.pathname;
  const PATH_TITLE: Record<string, string> = {
    "/mydashboard": "내 대시보드",
    "/mypage": "계정관리",
  };
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [toggleRotate, setToggleRotate] = useState<boolean>(false);
  const { myData } = useMyData();

  // 내가 만든 대시보드인지 확인하기
  const ownerIsMe = dashboardData?.createdByMe;

  const handleInviteDashBoard = () => {
    setIsModalOpen(true);
  };

  const handleClick = () => {
    setToggleRotate((prevRotate) => !prevRotate);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex items-center justify-end pr-12 bg-white pc:justify-between tablet:h-70 h-60 border-b-1 border-gray-D9D9 pc:pl-340 pl-0 pc:pr-80 tablet:pr-40 z-[300]">
        <div className="items-center hidden gap-8 font-bold pc:flex text-20 text-black-3332">
          {dashboardData ? dashboardData.title : PATH_TITLE[path]}
          {ownerIsMe && (
            <Image
              src="/images/crown.png"
              alt="왕관 아이콘 이모지"
              width="20"
              height="16"
              style={{ objectFit: "contain" }}
            />
          )}
        </div>
        <div className="flex items-center justify-end h-full gap-16 pc:gap-40 tablet:gap-32 shrink-0">
          {ownerIsMe && (
            <div className="flex gap-6 pc:gap-16 tablet:gap-12">
              <Link href={`/dashboard/${dashboardData?.id}/edit`}>
                <IconButton variant="ghost" type="setting" />
              </Link>
              <IconButton variant="ghost" type="invite" onClick={handleInviteDashBoard} />
            </div>
          )}
          {isModalOpen && <InviteModal onClose={() => setIsModalOpen(false)} />}
          <div className="flex items-center gap-12 pc:gap-32 tablet:gap-24">
            {dashboardData && <AvatarStack list={members as MemberApplicationServiceResponseDto[]} />}
            {dashboardData && <div className="w-1 bg-gray-D9D9 tablet:h-38 h-34" />}
            <ProfilePopover>
              <div className="flex gap-5 items-center" onClick={handleClick}>
                <ProfileLabel data={myData} />
                <Image
                  className={`transform ${toggleRotate ? "rotate-180" : "rotate-0"}`}
                  width={26}
                  height={26}
                  sizes="100vw"
                  src="/images/arrow_drop_down.png"
                  alt="토글 버튼"
                />
              </div>
            </ProfilePopover>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardHeader;
