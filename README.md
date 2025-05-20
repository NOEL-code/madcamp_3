## Dar함께 T래블

<br/><br/>
  
![DarT_Logo_1024](https://github.com/user-attachments/assets/28bd9617-daba-4719-b931-553fc2fbdf58)

> 다트를 던져서 나오는 나라로 여행을 떠나는 낭만적인 청춘을 위한 여행 모바일 어플리케이션
<br/>

## 프로젝트 소개

> 몰입캠프 3주차 과정 우수작 선정
<br/><br/>
> 개발기간: 1주
<br/><br/>
> 개발인원: 2명
<br/><br/>
> 사용 API: ChatGpt Open API
> <br/><br/>
> 사용 얼굴인식 모듈: [GitHub - serengil/deepface: A Lightweight Face Recognition and Facial Attribute Analysis (Age, Gender, Emotion and Race) Library for Python](https://github.com/serengil/deepface)


<br/>

## Member
|                                   신서원                                   |                                    정우성                                    |
|:-----------------------------------------------------------------------:|:-------------------------------------------------------------------------:|
| <img src = "https://avatars.githubusercontent.com/sswilove1" width=150px> | <img src = "https://avatars.githubusercontent.com/NOEL-code" width=150px> |
|                 [@sswilove1](https://github.com/sswilove1)                  |                [@NOEL-code](https://github.com/NOEL-code)                 |

## Stack

- Programming Language: ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white)  ![Python](https://img.shields.io/badge/-Python-3776AB?style=flat&logo=Python&logoColor=white)
- Frontend : ![HTML](https://img.shields.io/badge/-HTML5-E34F26?style=flat&logo=HTML5&logoColor=white) ![CSS](https://img.shields.io/badge/-CSS-1572B6?style=flat&logo=CSS3&logoColor=white) ![React Native](https://img.shields.io/badge/-React%20Native-61DAFB?style=flat&logo=React&logoColor=white)
- Backend : ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat&logo=Node.js&logoColor=white) ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat&logo=MongoDB&logoColor=white) ![Flask](https://img.shields.io/badge/-Flask-000000?style=flat&logo=Flask&logoColor=white) ![Nest.js](https://img.shields.io/badge/-Nest.js-E0234E?style=flat&logo=NestJS&logoColor=white) 
- Infra : ![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat&logo=Docker&logoColor=white) ![AWS](https://img.shields.io/badge/-AWS-232F3E?style=flat&logo=Amazon%20AWS&logoColor=white)
## 프로젝트 시작하기


#### Version

```
Node.js v22.4.0.
npm v10.8.1.
```

#### Installation
```
$ git clone https://github.com/NOEL-code/madcamp_3
$ cd madcamp_3
```

#### fontend

```
$ cd frontend
$ npm install
$ npx react-native run-android
```

#### backend

```
$ cd backend
$ npm install
$ npm run start
```



## Outline

---

### 앱 소개🏕️

최근에 인스타 릴스에서 볼펜을 던져서 여행지를 정하는 낭만 넘치는 청년들의 모습을 본 적이 있으신가요? 꼭 한 번 그렇게 여행을 떠나보면 정말 새롭고 재미있을 것 같은데, 막상 그런 여행을 기획하기는 쉽지가 않습니다. 다트와 지도를 구매하기도 힘들 뿐더러, 찍힌 장소가 유명 여행지가 아니면 계획을 짜기도 힘들죠. 그리고 세계지도에 다트를 던지기는 더더욱 힘들구요😢 그러한 분들을 위해 준비했습니다!

DarT는 Dart를 던져서 Dar같이 T래블을 떠날~ 낭만있는 청춘들을 위한 여행 어플입니다.


### DarT는…🙊

1. 지구를 돌리다 다트를 던져 여행 갈 국가를 정하는 Home 페이지
2. 최소한의 정보만을 입력 받아 여행 일정을 짜주는 I want & Recommendation 페이지
3. 갈 여행과 다녀온 여행을 관리할 수 있는 Collection 페이지
4. 진행 중인 여행에서 사진을 찍을 수 있는 Camera 페이지
5. 완료된 여행의 사진을 사람별로 열람할 수 있는 Memory 페이지

로 이루어져 있습니다.

### 개발 환경💻

- React-Native
- MongoDB
- Nest.js
- AWS EC2
- Docker
- Figma, Adobe Illustrator

## Details

---



### 1. Home🌏

- 지구를 돌리다 다트를 던져 여행 갈 국가를 정하는 페이지
- 지구 애니메이션: 여러 방향으로 돌려볼 수 있고, 기본적으로는 자전축을 기준으로 회전 중인 지구를 띄워줍니다.
- 다트: 클릭하면 다트가 화면으로 날아가고, 저장된 여러 나라 중에서 랜덤하게 여행갈 나라의 국기를 띄워줍니다.
- 우주인: 클릭하면 3번에서 설명할 Collection 페이지로 연결됩니다.
- ![home](https://github.com/user-attachments/assets/153731c1-bf72-4349-9f12-b4b56381583b)

### 2. I want & Recommendation📒

- 최소한의 정보를 입력 받아, 맞춤형 여행 일정을 짜주는 페이지
- I want 페이지에서는
    - DropDown을 이용하여 여행갈 시기, 인원, 기간, 예산, 종류를 설정할 수 있습니다.
    - 인원에 맞추어 프로필 버튼이 등장하는데, 그 각각에 이미지를 등록하고 이름을 작성할 수 있습니다.
    - Submit 버튼을 누르면, 입력한 정보를 기반으로 ChatGPT API에 prompt를 날려서, 여행 일정을 받아오게 됩니다.
- Recommendation 페이지에는
    - ‘선정된 나라 & I want에서 입력한 정보’가 예쁘게 정리되어 등장합니다.
    - ‘나라의 수도가 표시된 구글맵’이 있고, 클릭하여 크게 볼 수 있습니다.
    - ‘ChatGPT가 생성한 여행 일정’이 날짜별, 시간별로 노트에 예쁘게 등장합니다.
    - 나라나 일정이 마음에 들지 않으면 새로고침을 통해 홈으로 이동할 수 있고
    - 마음에 들면 체크 표시를 눌러 Collection 페이지에 저장된 계획을 볼 수 있습니다.
- ![I want](https://github.com/user-attachments/assets/e7ec51e4-bdbd-46ca-87e1-e66d42b7c54f)

### 3. Collection📚

- 생성한 여행 계획들과, 다녀온 여행을 관리할 수 있는 페이지
- Planned에는 진행 중인 여행이 세로 스크롤뷰로 등장합니다. 카메라 페이지나, 상세 일정을 보는 Planned 페이지로 이동할 수 있고, 꾹 눌러서 계획을 삭제할 수 있습니다.
- History에는 완료된 여행이 가로 스크롤뷰로 스와이프 형식으로 등장합니다. 여행 동안에 찍은 사진을 보는 Memory페이지로 이동할 수 있고, 꾹 눌러서 계획을 삭제할 수 있습니다.
- 완료된 여행의 기준은 사진 장수를 다 채운 것으로 합니다. History에 기록되는 날짜는 그 앨범 속 사진의 정보를 따릅니다.
- ![collection](https://github.com/user-attachments/assets/81dbab15-affb-4fb7-abba-6eaef0d74e9a)

### 4. Camera📸

- 진행 중인 여행에서 필름 카메라처럼 사진을 찍을 수 있는 페이지
- 필름카메라처럼, 제한된 개수 내에서 여행 사진을 찍을 수 있습니다. 사진은 갤러리가 아닌 DB에 저장되므로, 개수를 다 채우기 전까지는 열람할 수 없습니다.
- 사진 촬영 후, 그 여행에 등록된 인원들의 프로필 이미지와 촬영된 사진을 대조하여 사진을 분류합니다. 얼굴인식(Deepface)모듈을 사용하였습니다.
- ![camera](https://github.com/user-attachments/assets/2eaad9ac-029b-4c18-96d8-742367d2201a)


### 5. Memory 💌

- 완료된 여행의 사진을 사람별로 열람할 수 있는 페이지
- 여행 일행들 별로 분류된 사진을 살펴볼 수 있습니다.
- 매치하는 정보가 없는 경우, 미분류 페이지로 들어가게 됩니다.
- 사람별로 매치되는 사진이 없는 경우 No Image라는 텍스트가 등장합니다.
- ![memory](https://github.com/user-attachments/assets/babf09fa-4c1b-4060-a297-ca6616e5e0b6)

### 6. API 명세서 📄

![API 명세서](https://github.com/user-attachments/assets/37fa078e-0734-4301-b26b-224c3d7f5dfa)

### 7. 인프라 구조 

<img width="400" alt="Image" src="https://github.com/user-attachments/assets/d130cf28-c2f8-486e-9167-9af6c9ee52d0" />

### 마무리

이렇듯 DarT는, 낭만 랜덤 여행을 떠나는 청춘들이 ‘여행지 선정, 일정 계획, 추억 쌓기, 사진 분류’ 등을 더 잘 할 수 있도록 도우며 재미있는 추억을 쌓아줄 어플리케이션입니다. 체력과 낭만이 가득할 때에 저희 어플리케이션 사용해보시면서 발사되는 다트처럼 일상에서의 탈출을 하실 수 있길 바랍니다😊

![배경](https://github.com/user-attachments/assets/794da3b3-6d3e-41c1-ab81-49030657ee52)

