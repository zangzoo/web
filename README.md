# 🧠 AI Vision을 이용한 알츠하이머 진단 웹

## 📌 프로젝트 개요

본 프로젝트는 **MRI 기반 AI 진단 모델**을 활용한 **웹 기반 알츠하이머 진단 보조 시스템**입니다.  
영상의학과 의사와 전담의사가 함께 사용할 수 있도록 설계되었으며, 다음 기능을 제공합니다:

- AI 기반 MRI 진단 결과 제공
- 영상의학과 의사와 전담의사의 협업 소견 작성
- 환자 정보 및 진단 이력 관리
- 자동 PDF 보고서 생성

---

## 🚀 주요 기능

- **MRI 영상 기반 알츠하이머 예측**
  - 업로드된 MRI 영상을 AI가 분석하여 알츠하이머 여부 예측
- **영상의학과 의사 소견 작성**
  - AI 분석 결과를 기반으로 직접 진단 소견 입력
- **전담의사 처방 및 종합 소견 작성**
  - AI + 영상의학과 소견 참고 → 최종 처방 및 설명
- **환자 정보 및 진단 이력 관리**
  - 환자 등록 / 수정 / 삭제 및 진단 이력 관리
- **자동 보고서 생성**
  - 진단 결과 및 소견 기반 자동 PDF 보고서 생성

---

## 🔧 기술 스택

### 백엔드 (`/backend`)
- **Framework**: Django
- **AI/딥러닝**: TensorFlow, Keras
- **PDF 리포트 생성**: xhtml2pdf, reportlab, pyHanko, pypdf, pdfmake
- **기타**: numpy, pillow, lxml, requests 등

### 프론트엔드 (`/frontend/brainworks-frontend`)
- **Framework**: React
- **라우팅**: react-router-dom
- **3D MRI 시각화**: three.js, @react-three/fiber, @react-three/drei
- **캘린더/스케줄링**: react-calendar
- **PDF 생성**: jspdf, pdfmake, @grapecity/activereports
- **테스트**: @testing-library/react, jest-dom 등

---

## 👥 팀원 및 역할

| <img src="https://github.com/likeeun.png" width="80" height="80"/> | <img src="https://github.com/dotz0ver.png" width="80" height="80"/> | <img src="https://github.com/0gonge.png" width="80" height="80"/> | <img src="https://github.com/zangzoo.png" width="80" height="80"/> |
|:--:|:--:|:--:|:--:|
| **조채은** | **문소연** | **송여경** | **장지우** |
| PM / AI | 백엔드 / AI | 프론트엔드 / AI | 백엔드 / AI |
| [GitHub](https://github.com/likeeun) | [GitHub](https://github.com/dotz0ver) | [GitHub](https://github.com/0gonge) | [GitHub](https://github.com/zangzoo) |

---

## 🎬 시연 영상

👉 [유튜브에서 웹 실행 시연 영상 보기](https://www.youtube.com/watch?v=NB6MO7nbT_c&ab_channel=likeeun)

---

## 🛠️ 설치 및 실행 방법

### 백엔드 실행
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

```

### 프론트엔드

```bash
cd frontend/brainworks-frontend
npm install
npm start
```

