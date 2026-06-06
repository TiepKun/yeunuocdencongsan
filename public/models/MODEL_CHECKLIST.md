# Checklist mô hình 3D cho timeline

## Đã gắn lên web

| Giai đoạn | File GLB đang dùng trên web |
| --- | --- |
| 1890-1911 - Sinh ra và lớn lên tại Nam Đàn, Nghệ An | `optimized/Nha-Bac-Nam-Dan-optimized.glb` |
| 1911 - Ra đi tìm đường cứu nước | `optimized/Latouche-Treville-optimized.glb`, `optimized/Nguyen-Tat-Thanh-1911-optimized.glb` |
| 1917-1919 - Hoạt động ở Pháp | `optimized/Eiffel_Tower-optimized.glb` |
| 07/1920 - Tiếp cận Luận cương của Lênin | `optimized/Lenin-tren-buc-phat-bieu-optimized.glb` |
| 12/1920 - Đại hội Tours | `optimized/Bac-tai-Phap-1920-optimized.glb` |
| 1921-1923 - Hoạt động ở Pháp, Le Paria | `optimized/la peria-optimized.glb` |
| 03/02/1930 - Thành lập Đảng Cộng sản Việt Nam | `optimized/Hop-thanh-lap-Dang-optimized.glb` |

## Kích thước bản optimized

| File | Kích thước |
| --- | ---: |
| `optimized/Nha-Bac-Nam-Dan-optimized.glb` | 8 KB |
| `optimized/la peria-optimized.glb` | 104 KB |
| `optimized/Nguyen-Tat-Thanh-1911-optimized.glb` | 5.1 MB |
| `optimized/Eiffel_Tower-optimized.glb` | 6.0 MB |
| `optimized/Latouche-Treville-optimized.glb` | 6.2 MB |
| `optimized/Lenin-tren-buc-phat-bieu-optimized.glb` | 18 MB |
| `optimized/Hop-thanh-lap-Dang-optimized.glb` | 20 MB |
| `optimized/Bac-tai-Phap-1920-optimized.glb` | 29 MB |

Ghi chú: `Nha-Bac-Nam-Dan-optimized.glb` là bản proxy dựng lại gọn để thay thế file scan gốc quá nặng. File gốc `Nha-Bac-Nam-Dan.glb` vẫn được giữ lại trong thư mục `public/models`.

## Kích thước bản timeline

Các file này được render trực tiếp trên timeline chính để tất cả mô hình 3D luôn hiện mà vẫn nhẹ khi xoay camera.

| File | Kích thước |
| --- | ---: |
| `timeline/Nha-Bac-Nam-Dan-timeline.glb` | 8 KB |
| `timeline/la peria-timeline.glb` | 104 KB |
| `timeline/Nguyen-Tat-Thanh-1911-timeline.glb` | 1.4 MB |
| `timeline/Latouche-Treville-timeline.glb` | 1.5 MB |
| `timeline/Eiffel_Tower-timeline.glb` | 2.3 MB |
| `timeline/Bac-tai-Phap-1920-timeline.glb` | 5.7 MB |
| `timeline/Lenin-tren-buc-phat-bieu-timeline.glb` | 6.4 MB |
| `timeline/Hop-thanh-lap-Dang-timeline.glb` | 6.9 MB |

## Cần chuẩn bị thêm GLB

| Giai đoạn | Mô hình nên chuẩn bị |
| --- | --- |
| 1911-1917 - Khảo sát thế giới thuộc địa và tư bản | Bản đồ thế giới 3D có tuyến hành trình, cảng biển hoặc hình tượng người lao động thuộc địa. |
| 06/1919 - Bản yêu sách của nhân dân Việt Nam | Bản yêu sách hoặc bối cảnh Hội nghị Versailles năm 1919. |
| 1923-1924 - Hoạt động ở Liên Xô | Tòa nhà Quốc tế Cộng sản, hội trường học tập hoặc biểu tượng Moscow thời kỳ này. |
| 1924-1927 - Hoạt động ở Trung Quốc | Lớp học chính trị, hoạt động huấn luyện hoặc cơ sở cách mạng tại Trung Quốc. |
| 1925 - Bản án chế độ thực dân Pháp | Mô hình sách/tài liệu Bản án chế độ thực dân Pháp. |
| 1927 - Đường Kách mệnh | Mô hình sách/tài liệu Đường Kách mệnh hoặc tài liệu huấn luyện cán bộ. |
| 1928-1929 - Hoạt động ở Thái Lan | Hoạt động vận động cộng đồng người Việt ở Thái Lan. |

## Quy ước đặt file

- Đưa file vào thư mục `public/models`.
- Đặt tên không dấu, không khoảng trắng nếu có thể, ví dụ `Ban-yeu-sach-1919.glb`.
- Khi có file mới, thêm đường dẫn vào trường `models3d` của sự kiện tương ứng trong `src/data/timeline.ts`.
- Web ưu tiên dùng file trong `public/models/optimized`. Bản gốc có thể giữ lại để chỉnh sửa hoặc nén lại sau.
