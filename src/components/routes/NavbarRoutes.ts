export const NavbarRoutes = [
  {
    name: "Trang chủ",
    href: "/",
  },
  {
    name: "Phim lẻ",
    href: "/short",
  },
  {
    name: "Phim bộ",
    href: "/series",
  },
  {
    name: "Thể loại",
    children: [
      "Hành động",
      "Hài hước",
      "Kinh dị",
      "Tình cảm",
      "Viễn tưởng",
      "Chính kịch",
      "Phiêu lưu",
      "Khoa học",
    ],
  },
  {
    name: "Quốc gia",
    children: [
      "Trung Quốc",
      "Hàn Quốc",
      "Nhật Bản",
      "Thái Lan",
      "Âu Mỹ",
      "Nga",
      "Singapore",
    ],
  },
  {
    name: "Năm phát hành",
  },
];
