import type { TimelineEvent, TimelinePhase } from "@/types/timeline";

export const phaseMeta: Record<
  TimelinePhase,
  { label: string; accent: string; glow: string; text: string }
> = {
  roots: {
    label: "1890-1911 | Quê hương và tuổi trẻ",
    accent: "#7aa56d",
    glow: "#f1d37a",
    text: "Giai đoạn hình thành nền tảng gia đình, quê hương và nhân cách yêu nước ban đầu."
  },
  search_path: {
    label: "1911-1920 | Tìm đường",
    accent: "#74b8d8",
    glow: "#f1d37a",
    text: "Giai đoạn tìm tòi con đường cứu nước, giải phóng dân tộc."
  },
  ideological_turning_point: {
    label: "1920 | Bước ngoặt tư tưởng",
    accent: "#d64536",
    glow: "#ffd36a",
    text: "Bước chuyển từ chủ nghĩa yêu nước sang lập trường Mác-Lênin."
  },
  formation: {
    label: "1921-1930 | Hình thành cơ bản",
    accent: "#9f2f2b",
    glow: "#c99a4a",
    text: "Giai đoạn hình thành cơ bản tư tưởng về cách mạng Việt Nam."
  }
};

const sourceNote =
  "Theo giáo trình Tư tưởng Hồ Chí Minh và tư liệu ảnh được cung cấp.";
const missingImageNote =
  "Cần bổ sung tư liệu ảnh thật. Không sử dụng ảnh mô phỏng thay tư liệu lịch sử.";

export const timelineEvents: TimelineEvent[] = [
  {
    id: "1890-1911-que-huong-nam-dan",
    year: "1890-1911",
    title: "Sinh ra và lớn lên tại Nam Đàn, Nghệ An",
    location: "Kim Liên, Nam Đàn, Nghệ An",
    phase: "roots",
    shortDescription:
      "Nguyễn Sinh Cung sinh ra và lớn lên trong môi trường quê hương, gia đình giàu truyền thống yêu nước.",
    detail:
      "Nguyễn Sinh Cung, sau này là Hồ Chí Minh, sinh ngày 19/5/1890 tại quê hương Nghệ An. Những năm tháng tuổi trẻ ở Nam Đàn và trong môi trường gia đình nhà nho yêu nước góp phần nuôi dưỡng lòng yêu nước, ý thức dân tộc và sự quan tâm đến đời sống nhân dân.",
    ideologicalMeaning:
      "Đây là nền tảng ban đầu hình thành nhân cách, tình cảm yêu nước và ý thức về vận mệnh dân tộc trước khi Người ra đi tìm đường cứu nước năm 1911.",
    modelType: "home",
    images: [
      {
        src: "/historical-assets/1890-nha-bac-nam-dan.jpg",
        caption:
          "Nhà Bác tại Nam Đàn, Nghệ An - cần bổ sung tư liệu ảnh thật.",
        sourceNote: missingImageNote
      }
    ]
  },
  {
    id: "1911-ra-di-tim-duong",
    year: "1911",
    title: "Ra đi tìm đường cứu nước",
    location: "Bến Nhà Rồng; hành trình đến Pháp",
    phase: "search_path",
    shortDescription:
      "Nguyễn Tất Thành bắt đầu hành trình tìm một con đường cứu nước mới.",
    detail:
      "Năm 1911, Nguyễn Tất Thành ra đi tìm đường cứu nước. Điểm đến đầu tiên là Pháp, nơi Người muốn trực tiếp tìm hiểu khẩu hiệu tự do, bình đẳng, bác ái và quan sát xã hội phương Tây từ đời sống thực tế.",
    ideologicalMeaning:
      "Mở đầu quá trình khảo nghiệm độc lập, đặt nền cho việc tìm một con đường giải phóng dân tộc khác với các khuynh hướng cứu nước trước đó.",
    modelType: "ship",
    images: [
      {
        src: "/historical-assets/1911-anh-ba-nguyen-tat-thanh.jpg",
        caption:
          "Anh Ba Nguyễn Tất Thành năm 1911 - cần bổ sung tư liệu ảnh thật.",
        sourceNote: missingImageNote
      }
    ]
  },
  {
    id: "1911-1917-khao-sat-the-gioi",
    year: "1911-1917",
    title: "Khảo sát thế giới thuộc địa và tư bản",
    location: "Nhiều nước ở châu Âu, châu Phi, châu Mỹ",
    phase: "search_path",
    shortDescription:
      "Người đi qua nhiều châu lục, tiếp xúc với người lao động và các dân tộc bị áp bức.",
    detail:
      "Trong những năm 1911-1917, Nguyễn Tất Thành đến nhiều nước ở châu Âu, châu Phi, châu Mỹ. Người sống và làm việc cùng người lao động làm thuê ở phương Tây, đồng thời quan sát tình cảnh các dân tộc thuộc địa ở phương Đông.",
    ideologicalMeaning:
      "Những trải nghiệm trực tiếp giúp Người nhận thấy sự áp bức của chủ nghĩa thực dân có tính quốc tế, từ đó mở rộng chủ nghĩa yêu nước thành ý thức liên hệ với phong trào giải phóng các dân tộc bị áp bức.",
    modelType: "globe",
    images: [
      {
        src: "/historical-assets/placeholder.jpg",
        caption: "Cần bổ sung tư liệu ảnh về hành trình khảo sát 1911-1917.",
        sourceNote: missingImageNote
      }
    ]
  },
  {
    id: "1917-1919-hoat-dong-o-phap",
    year: "1917-1919",
    title: "Hoạt động ở Pháp",
    location: "Paris, Pháp",
    phase: "search_path",
    shortDescription:
      "Sống với người lao động ở Paris và hình thành nhận thức về đoàn kết quốc tế.",
    detail:
      "Tại Pháp, Nguyễn Ái Quốc tiếp xúc với đời sống của người lao động, tham gia hoạt động chính trị và phân biệt rõ giữa nhân dân lao động Pháp với lực lượng thực dân. Trải nghiệm này góp phần hình thành nhận thức về tình đoàn kết giữa các lực lượng bị áp bức.",
    ideologicalMeaning:
      "Tư tưởng yêu nước được mở rộng theo hướng gắn vấn đề dân tộc Việt Nam với phong trào tiến bộ và phong trào công nhân quốc tế.",
    modelType: "paris",
    images: [
      {
        src: "/historical-assets/placeholder.jpg",
        caption: "Cần bổ sung tư liệu ảnh về hoạt động ở Pháp 1917-1919.",
        sourceNote: missingImageNote
      }
    ]
  },
  {
    id: "1919-ban-yeu-sach",
    year: "06/1919",
    title: "Bản yêu sách của nhân dân Việt Nam",
    location: "Hội nghị Versailles, Pháp",
    phase: "search_path",
    shortDescription:
      "Nguyễn Ái Quốc gửi bản yêu sách tới Hội nghị Versailles.",
    detail:
      "Tháng 6/1919, Nguyễn Ái Quốc gửi Bản yêu sách của nhân dân Việt Nam tới Hội nghị Versailles. Văn kiện nêu yêu cầu về quyền tự do, dân chủ và quyền bình đẳng cho nhân dân Việt Nam trong bối cảnh sau Chiến tranh thế giới thứ nhất.",
    ideologicalMeaning:
      "Sự kiện thể hiện bước trưởng thành trong đấu tranh chính trị công khai, đưa vấn đề quyền dân tộc của Việt Nam ra trước dư luận quốc tế.",
    modelType: "document",
    images: [
      {
        src: "/historical-assets/1919-versailles.jpg",
        caption: "Hội nghị Versailles 1919 - cần bổ sung tư liệu ảnh thật.",
        sourceNote: missingImageNote
      },
      {
        src: "/historical-assets/1919-ban-yeu-sach.jpg",
        caption:
          "Bản yêu sách của nhân dân Việt Nam - cần bổ sung tư liệu ảnh thật.",
        sourceNote: missingImageNote
      }
    ]
  },
  {
    id: "1920-luan-cuong-lenin",
    year: "07/1920",
    title: "Tiếp cận Luận cương của Lênin",
    location: "Pháp",
    phase: "ideological_turning_point",
    shortDescription:
      "Nguyễn Ái Quốc tìm thấy con đường giải phóng dân tộc theo cách mạng vô sản.",
    detail:
      "Tháng 7/1920, khi đọc Sơ thảo lần thứ nhất những Luận cương về vấn đề dân tộc và vấn đề thuộc địa của V.I. Lênin, Nguyễn Ái Quốc tìm thấy lời giải cho vấn đề giải phóng dân tộc thuộc địa. Đây là bước ngoặt tư tưởng quan trọng, giúp Người xác định con đường cứu nước theo cách mạng vô sản.",
    ideologicalMeaning:
      "Đánh dấu sự chuyển biến từ chủ nghĩa yêu nước sang lập trường Mác-Lênin, đặt nền tảng cho tư tưởng độc lập dân tộc gắn liền với chủ nghĩa xã hội.",
    modelType: "book",
    images: [
      {
        src: "/historical-assets/1920-luan-cuong-lenin.jpg",
        caption:
          "Sơ thảo Luận cương về vấn đề dân tộc và thuộc địa - cần bổ sung tư liệu ảnh thật.",
        sourceNote: missingImageNote
      }
    ]
  },
  {
    id: "1920-dai-hoi-tours",
    year: "12/1920",
    title: "Đại hội Tours",
    location: "Tours, Pháp",
    phase: "ideological_turning_point",
    shortDescription:
      "Nguyễn Ái Quốc đứng về phía Quốc tế Cộng sản và tham gia sáng lập Đảng Cộng sản Pháp.",
    detail:
      "Tháng 12/1920, tại Đại hội Tours, Nguyễn Ái Quốc đứng về phía Quốc tế Cộng sản và tham gia sáng lập Đảng Cộng sản Pháp. Sự lựa chọn này khẳng định lập trường mới của Người trong phong trào cách mạng vô sản.",
    ideologicalMeaning:
      "Từ một người yêu nước chống thực dân, Nguyễn Ái Quốc trở thành chiến sĩ cộng sản, xác lập cơ sở chính trị cho con đường giải phóng dân tộc theo cách mạng vô sản.",
    modelType: "congress",
    images: [
      {
        src: "/historical-assets/1920-dai-hoi-tours.jpg",
        caption:
          "Nguyễn Ái Quốc tại Đại hội Tours - cần bổ sung tư liệu ảnh thật.",
        sourceNote: missingImageNote
      }
    ]
  },
  {
    id: "1921-1923-le-paria",
    year: "1921-1923",
    title: "Hoạt động ở Pháp, Le Paria",
    location: "Pháp",
    phase: "formation",
    shortDescription:
      "Tuyên truyền chống chủ nghĩa thực dân và gắn vấn đề thuộc địa với cách mạng vô sản.",
    detail:
      "Trong những năm 1921-1923, Nguyễn Ái Quốc hoạt động ở Pháp, tham gia tuyên truyền tư tưởng giải phóng dân tộc. Năm 1922, báo Le Paria / Người cùng khổ trở thành diễn đàn tố cáo chủ nghĩa thực dân và bênh vực các dân tộc thuộc địa.",
    ideologicalMeaning:
      "Góp phần hình thành tư tưởng gắn cách mạng thuộc địa với phong trào cách mạng vô sản, đồng thời khẳng định vai trò tuyên truyền, giác ngộ quần chúng.",
    modelType: "newspaper",
    images: [
      {
        src: "/historical-assets/1922-le-paria.jpg",
        caption: "Báo Le Paria năm 1922 - cần bổ sung tư liệu ảnh thật.",
        sourceNote: missingImageNote
      }
    ]
  },
  {
    id: "1923-1924-lien-xo",
    year: "1923-1924",
    title: "Hoạt động ở Liên Xô",
    location: "Liên Xô",
    phase: "formation",
    shortDescription:
      "Tiếp cận sâu hơn phong trào cộng sản quốc tế và cơ sở lý luận Mác-Lênin.",
    detail:
      "Trong thời gian hoạt động ở Liên Xô, Nguyễn Ái Quốc tiếp cận sâu hơn với phong trào cộng sản quốc tế, nghiên cứu lý luận và kinh nghiệm cách mạng trong bối cảnh Cách mạng Tháng Mười Nga đã mở ra thời đại mới.",
    ideologicalMeaning:
      "Củng cố cơ sở lý luận Mác-Lênin cho tư tưởng về cách mạng giải phóng dân tộc, nhất là quan hệ giữa vấn đề dân tộc và cách mạng vô sản.",
    modelType: "soviet",
    images: [
      {
        src: "/historical-assets/placeholder.jpg",
        caption: "Cần bổ sung tư liệu ảnh về hoạt động ở Liên Xô 1923-1924.",
        sourceNote: missingImageNote
      }
    ]
  },
  {
    id: "1924-1927-trung-quoc",
    year: "1924-1927",
    title: "Hoạt động ở Trung Quốc",
    location: "Trung Quốc",
    phase: "formation",
    shortDescription:
      "Chuẩn bị về chính trị, tư tưởng và tổ chức cho cách mạng Việt Nam.",
    detail:
      "Trong giai đoạn 1924-1927 ở Trung Quốc, Nguyễn Ái Quốc chú trọng chuẩn bị chính trị, tư tưởng và tổ chức cho cách mạng Việt Nam. Các hoạt động huấn luyện, truyền bá lý luận và xây dựng lực lượng tạo nền cho phong trào cách mạng trong nước.",
    ideologicalMeaning:
      "Khẳng định tư tưởng cách mạng là sự nghiệp của quần chúng, cần có tổ chức cách mạng và đội ngũ cán bộ được giáo dục bằng lý luận tiên tiến.",
    modelType: "training",
    images: [
      {
        src: "/historical-assets/placeholder.jpg",
        caption: "Cần bổ sung tư liệu ảnh về hoạt động ở Trung Quốc 1924-1927.",
        sourceNote: missingImageNote
      }
    ]
  },
  {
    id: "1925-ban-an-thuc-dan",
    year: "1925",
    title: "Bản án chế độ thực dân Pháp",
    location: "Hoạt động tuyên truyền cách mạng",
    phase: "formation",
    shortDescription:
      "Tác phẩm tố cáo bản chất áp bức, bóc lột của chủ nghĩa thực dân.",
    detail:
      "Năm 1925, tác phẩm Bản án chế độ thực dân Pháp tố cáo bản chất áp bức, bóc lột của chủ nghĩa thực dân. Tác phẩm góp phần làm rõ nguyên nhân đau khổ của các dân tộc thuộc địa và tính chính nghĩa của cuộc đấu tranh giải phóng.",
    ideologicalMeaning:
      "Làm sâu sắc tư tưởng chống chủ nghĩa thực dân, đồng thời củng cố quan điểm giải phóng dân tộc phải gắn với phong trào cách mạng tiến bộ trên thế giới.",
    modelType: "justice_book",
    images: [
      {
        src: "/historical-assets/placeholder.jpg",
        caption:
          "Cần bổ sung tư liệu ảnh về Bản án chế độ thực dân Pháp năm 1925.",
        sourceNote: missingImageNote
      }
    ]
  },
  {
    id: "1927-duong-kach-menh",
    year: "1927",
    title: "Đường Kách mệnh",
    location: "Trung Quốc",
    phase: "formation",
    shortDescription:
      "Tác phẩm trình bày những vấn đề cơ bản về đường lối cách mạng Việt Nam.",
    detail:
      "Năm 1927, tác phẩm Đường Kách mệnh trình bày những vấn đề cơ bản về đường lối cách mạng, vai trò của Đảng cách mạng, quần chúng và lý luận cách mạng. Đây là tài liệu quan trọng trong quá trình chuẩn bị tư tưởng và tổ chức.",
    ideologicalMeaning:
      "Góp phần hình thành tư tưởng về con đường cách mạng Việt Nam: có Đảng lãnh đạo, lấy quần chúng làm gốc, kết hợp độc lập dân tộc với mục tiêu xã hội chủ nghĩa.",
    modelType: "road_book",
    images: [
      {
        src: "/historical-assets/placeholder.jpg",
        caption: "Cần bổ sung tư liệu ảnh về tác phẩm Đường Kách mệnh năm 1927.",
        sourceNote: missingImageNote
      }
    ]
  },
  {
    id: "1928-1929-thai-lan",
    year: "1928-1929",
    title: "Hoạt động ở Thái Lan",
    location: "Thái Lan",
    phase: "formation",
    shortDescription:
      "Tiếp tục vận động, tổ chức và truyền bá tư tưởng cách mạng.",
    detail:
      "Trong giai đoạn 1928-1929 ở Thái Lan, Nguyễn Ái Quốc tiếp tục vận động, tổ chức và truyền bá tư tưởng cách mạng trong cộng đồng người Việt. Hoạt động này góp phần duy trì liên hệ và chuẩn bị lực lượng cho cách mạng Việt Nam.",
    ideologicalMeaning:
      "Thể hiện tư tưởng đoàn kết dân tộc gắn với đoàn kết quốc tế, đồng thời nhấn mạnh tinh thần tự lực, tự cường trong tổ chức lực lượng cách mạng.",
    modelType: "community",
    images: [
      {
        src: "/historical-assets/placeholder.jpg",
        caption: "Cần bổ sung tư liệu ảnh về hoạt động ở Thái Lan 1928-1929.",
        sourceNote: missingImageNote
      }
    ]
  },
  {
    id: "1930-thanh-lap-dang",
    year: "03/02/1930",
    title: "Thành lập Đảng Cộng sản Việt Nam",
    location: "Hội nghị hợp nhất các tổ chức cộng sản",
    phase: "formation",
    shortDescription:
      "Đảng Cộng sản Việt Nam ra đời và thông qua Cương lĩnh đầu tiên.",
    detail:
      "Ngày 03/02/1930, Đảng Cộng sản Việt Nam ra đời và thông qua Cương lĩnh đầu tiên. Sự kiện đánh dấu tư tưởng cách mạng của Hồ Chí Minh được truyền bá, tổ chức thành lực lượng lãnh đạo cách mạng Việt Nam.",
    ideologicalMeaning:
      "Kết tinh quá trình hình thành tư tưởng về con đường cách mạng Việt Nam: giải phóng dân tộc theo cách mạng vô sản, độc lập dân tộc gắn với chủ nghĩa xã hội, có Đảng cách mạng lãnh đạo và dựa vào sức mạnh quần chúng.",
    modelType: "torch",
    images: [
      {
        src: "/historical-assets/placeholder.jpg",
        caption:
          "Cần bổ sung tư liệu ảnh về sự kiện thành lập Đảng Cộng sản Việt Nam.",
        sourceNote: missingImageNote
      }
    ]
  }
];

export function getTimelineEvent(id: string) {
  return timelineEvents.find((event) => event.id === id) ?? timelineEvents[0];
}

export function getTimelineIndex(id: string) {
  return Math.max(
    0,
    timelineEvents.findIndex((event) => event.id === id)
  );
}
