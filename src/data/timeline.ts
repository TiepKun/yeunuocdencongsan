import type { TimelineEvent, TimelinePhase } from "@/types/timeline";

export const phaseMeta: Record<
  TimelinePhase,
  { label: string; accent: string; glow: string; text: string }
> = {
  roots: {
    label: "1890-1911 | Quê hương và tuổi trẻ",
    accent: "#7fb98f",
    glow: "#f4d77b",
    text: "Giai đoạn hình thành nền tảng gia đình, quê hương và nhân cách yêu nước ban đầu."
  },
  search_path: {
    label: "1911-1920 | Tìm đường",
    accent: "#63c3c0",
    glow: "#f2c96a",
    text: "Giai đoạn tìm tòi con đường cứu nước, giải phóng dân tộc."
  },
  ideological_turning_point: {
    label: "1920 | Bước ngoặt tư tưởng",
    accent: "#c84e45",
    glow: "#ffd36a",
    text: "Bước chuyển từ chủ nghĩa yêu nước sang lập trường Mác-Lênin."
  },
  formation: {
    label: "1921-1930 | Hình thành cơ bản",
    accent: "#a93f42",
    glow: "#d8a850",
    text: "Giai đoạn hình thành cơ bản tư tưởng về cách mạng Việt Nam."
  }
};

const sourceNote =
  "Nguồn tư liệu ảnh: bộ tư liệu lịch sử về Chủ tịch Hồ Chí Minh.";
const providedImageNote =
  "Nguồn tư liệu ảnh: tư liệu về Chủ tịch Hồ Chí Minh và phong trào cách mạng Việt Nam.";

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
    models3d: [
      {
        src: "/models/optimized/Nha-Bac-Nam-Dan-optimized.glb",
        timelineSrc: "/models/timeline/Nha-Bac-Nam-Dan-timeline.glb",
        label: "Nhà Bác tại Nam Đàn",
        fitSize: 1.52,
        rotation: [0, -0.28, 0]
      }
    ],
    images: [
      {
        src: "/historical-assets/1890-nha-bac-nam-dan.jpg",
        caption: "Nhà Bác tại Nam Đàn, Nghệ An.",
        sourceNote
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
    models3d: [
      {
        src: "/models/optimized/Latouche-Treville-optimized.glb",
        timelineSrc: "/models/timeline/Latouche-Treville-timeline.glb",
        label: "Tàu Latouche-Tréville",
        fitSize: 1.7,
        position: [0.02, 0.2, 0],
        rotation: [0, -0.48, 0]
      },
      {
        src: "/models/optimized/Nguyen-Tat-Thanh-1911-optimized.glb",
        timelineSrc: "/models/timeline/Nguyen-Tat-Thanh-1911-timeline.glb",
        label: "Nguyễn Tất Thành năm 1911",
        fitSize: 0.95,
        position: [-0.52, 0.18, 0.3],
        rotation: [0, 0.3, 0],
        scale: 0.72
      }
    ],
    images: [
      {
        src: "/historical-assets/1911-anh-ba-nguyen-tat-thanh.jpg",
        caption: "Anh Ba Nguyễn Tất Thành trong giai đoạn ra đi tìm đường cứu nước.",
        sourceNote
      },
      {
        src: "/historical-assets/1911-ben-nha-rong.jpg",
        caption:
          "Tư liệu minh họa hành trình từ Bến Nhà Rồng trên tàu Latouche-Tréville năm 1911.",
        sourceNote
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
    missingModelDescription:
      "Cần GLB mô tả hành trình khảo sát nhiều châu lục 1911-1917, ví dụ bản đồ thế giới 3D có tuyến đường, cảng biển hoặc hình tượng người lao động thuộc địa.",
    images: [
      {
        src: "/historical-assets/1911-1917-hanh-trinh-the-gioi.png",
        caption:
          "Bản đồ hành trình khảo sát thế giới của Nguyễn Tất Thành giai đoạn 1911-1917.",
        sourceNote
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
    models3d: [
      {
        src: "/models/optimized/Eiffel_Tower-optimized.glb",
        timelineSrc: "/models/timeline/Eiffel_Tower-timeline.glb",
        label: "Tháp Eiffel - Paris",
        fitSize: 1.52,
        position: [0, -0.04, 0],
        rotation: [0, 0.22, 0]
      }
    ],
    images: [
      {
        src: "/historical-assets/1919-the-can-cuoc-paris.jpg",
        caption: "Thẻ căn cước của Nguyễn Ái Quốc ở Paris năm 1919.",
        sourceNote
      },
      {
        src: "/historical-assets/1919-nha-compoint-paris.jpg",
        caption:
          "Ngôi nhà số 9, ngõ Compoint, nơi Nguyễn Ái Quốc từng ở trong thời gian hoạt động tại Pháp.",
        sourceNote
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
    missingModelDescription:
      "Cần GLB về Bản yêu sách của nhân dân Việt Nam hoặc bối cảnh Hội nghị Versailles năm 1919.",
    images: [
      {
        src: "/historical-assets/1919-versailles.jpg",
        caption: "Quang cảnh Hội nghị Versailles năm 1919.",
        sourceNote
      },
      {
        src: "/historical-assets/1919-ban-yeu-sach.jpg",
        caption: "Bản yêu sách của nhân dân Việt Nam gửi tới Hội nghị Versailles.",
        sourceNote
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
    models3d: [
      {
        src: "/models/optimized/Lenin-tren-buc-phat-bieu-optimized.glb",
        timelineSrc: "/models/timeline/Lenin-tren-buc-phat-bieu-timeline.glb",
        label: "Lênin trên bục phát biểu",
        fitSize: 1.28,
        showInPreview: false,
        position: [-0.42, 0, 0.04],
        rotation: [0, -0.22, 0],
        scale: 0.76
      },
      {
        src: "/models/optimized/La-Humanite-optimized.glb",
        timelineSrc: "/models/timeline/La-Humanite-timeline.glb",
        label: "Báo L'Humanité năm 1920",
        fitSize: 1.12,
        position: [0.48, -0.02, 0.18],
        rotation: [1.18, 0, 0.08],
        scale: 0.74
      }
    ],
    images: [
      {
        src: "/historical-assets/1920-luan-cuong-lenin.jpg",
        caption:
          "Tư liệu báo L'Humanité năm 1920, bối cảnh Nguyễn Ái Quốc tiếp cận tư tưởng của Lênin.",
        sourceNote
      },
      {
        src: "/historical-assets/1920-lhumanite-trang-2.jpg",
        caption: "Tư liệu báo L'Humanité năm 1920 - trang 2.",
        sourceNote
      },
      {
        src: "/historical-assets/1920-lhumanite-trang-3.jpg",
        caption: "Tư liệu báo L'Humanité năm 1920 - trang 3.",
        sourceNote
      },
      {
        src: "/historical-assets/1920-lhumanite-trang-4.jpg",
        caption: "Tư liệu báo L'Humanité năm 1920 - trang 4.",
        sourceNote
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
    models3d: [
      {
        src: "/models/optimized/Bac-tai-Phap-1920-optimized.glb",
        timelineSrc: "/models/timeline/Bac-tai-Phap-1920-timeline.glb",
        label: "Nguyễn Ái Quốc tại Pháp năm 1920",
        fitSize: 1.28,
        rotation: [0, -0.18, 0]
      }
    ],
    images: [
      {
        src: "/historical-assets/1920-dai-hoi-tours.jpg",
        caption: "Nguyễn Ái Quốc tại Đại hội Tours năm 1920.",
        sourceNote
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
    models3d: [
      {
        src: "/models/optimized/la%20peria-optimized.glb",
        timelineSrc: "/models/timeline/la%20peria-timeline.glb",
        label: "Báo Le Paria",
        fitSize: 1.18,
        position: [0, 0.2, 0],
        rotation: [0, 0.2, 0]
      }
    ],
    images: [
      {
        src: "/historical-assets/1922-le-paria.jpg",
        caption: "Báo Le Paria, số ra ngày 01/5/1922.",
        sourceNote
      },
      {
        src: "/historical-assets/1922-le-paria-so-5.jpg",
        caption: "Báo Le Paria, số ra ngày 01/8/1922.",
        sourceNote
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
    models3d: [
      {
        src: "/models/optimized/Sao-do-optimized.glb",
        timelineSrc: "/models/timeline/Sao-do-timeline.glb",
        label: "Biểu tượng sao đỏ",
        fitSize: 1.36,
        rotation: [0, -0.16, 0],
        materialColor: "#b5282f",
        emissiveColor: "#4f090d"
      }
    ],
    images: [
      {
        src: "/historical-assets/1923-1924-lien-xo-quoc-te-cong-san.jpg",
        caption:
          "Nguyễn Ái Quốc trong thời gian hoạt động, học tập và tiếp xúc với phong trào cộng sản quốc tế tại Liên Xô.",
        sourceNote: providedImageNote
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
    missingModelDescription:
      "Cần GLB mô tả hoạt động huấn luyện, lớp học chính trị hoặc cơ sở cách mạng tại Trung Quốc giai đoạn 1924-1927.",
    images: [
      {
        src: "/historical-assets/1924-1927-lop-huan-luyen-quang-chau.webp",
        caption:
          "Lớp huấn luyện chính trị ở Quảng Châu, gắn với quá trình chuẩn bị cán bộ và tổ chức cho cách mạng Việt Nam.",
        sourceNote: providedImageNote
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
    models3d: [
      {
        src: "/models/optimized/Ban-an-che-do-thuc-dan-Phap-optimized.glb",
        timelineSrc:
          "/models/timeline/Ban-an-che-do-thuc-dan-Phap-timeline.glb",
        label: "Bản án chế độ thực dân Pháp",
        fitSize: 1.42,
        rotation: [0, -0.24, 0]
      }
    ],
    images: [
      {
        src: "/historical-assets/1925-ban-an-che-do-thuc-dan-phap.jpg",
        caption: "Bìa tác phẩm Bản án chế độ thực dân Pháp.",
        sourceNote
      },
      {
        src: "/historical-assets/1925-ban-an-che-do-thuc-dan-phap-ban-mo.jpg",
        caption:
          "Tư liệu bản sách Bản án chế độ thực dân Pháp của Nguyễn Ái Quốc.",
        sourceNote: providedImageNote
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
    models3d: [
      {
        src: "/models/optimized/Duong-Kach-menh-optimized.glb",
        timelineSrc: "/models/timeline/Duong-Kach-menh-timeline.glb",
        label: "Tác phẩm Đường Kách mệnh",
        fitSize: 1.42,
        rotation: [0, 0.22, 0]
      }
    ],
    images: [
      {
        src: "/historical-assets/1927-duong-kach-menh.jpg",
        caption: "Tác phẩm Đường Kách mệnh, xuất bản năm 1927.",
        sourceNote: providedImageNote
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
    missingModelDescription:
      "Cần GLB mô tả hoạt động vận động cộng đồng người Việt ở Thái Lan giai đoạn 1928-1929.",
    images: [
      {
        src: "/historical-assets/1928-1929-hoat-dong-thai-lan.webp",
        caption:
          "Tư liệu về hoạt động vận động, tổ chức trong cộng đồng người Việt ở Thái Lan giai đoạn 1928-1929.",
        sourceNote: providedImageNote
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
    models3d: [
      {
        src: "/models/optimized/Hop-thanh-lap-Dang-optimized.glb",
        timelineSrc: "/models/timeline/Hop-thanh-lap-Dang-timeline.glb",
        label: "Hội nghị thành lập Đảng",
        fitSize: 1.42,
        rotation: [0, -0.28, 0]
      }
    ],
    images: [
      {
        src: "/historical-assets/1930-hoi-nghi-thanh-lap-dang.jpg",
        caption:
          "Tranh tư liệu minh họa Hội nghị thành lập Đảng Cộng sản Việt Nam năm 1930.",
        sourceNote: providedImageNote
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
