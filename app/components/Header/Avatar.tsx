export const Avatar = ({ userName }: { userName: string }) => {
  return (
    <div className="md:flex md:items-center md:justify-between md:gap-4 md:pr-5 md:border-r border-[#e0e5eb] dt:gap-3">
      {/* todo - only if we doesnt have avatar */}
      <div className="w-8 h-8 bg-lightBg rounded-full flex items-center justify-center">
        <span className="text-secondary font-roboto font-bold text-label">
          {userName?.charAt(0)}
        </span>
      </div>
      <span className="max-md:hidden tracking-medium text-label font-roboto text-secondary">
        {userName}
      </span>
    </div>
  );
};
