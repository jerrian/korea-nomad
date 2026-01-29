import { CityDetail, CityReview } from '@/types';
import { allCities } from './cities';

export const cityDetails: Record<string, CityDetail> = {
  jeju: {
    id: 'jeju',
    description:
      '제주도는 대한민국 최남단에 위치한 섬으로, 아름다운 자연환경과 온화한 기후로 디지털 노마드들에게 인기 있는 여행지입니다. 해안 도로를 따라 펼쳐진 카페들과 코워킹 스페이스가 많아 일과 휴식을 동시에 즐길 수 있습니다. 특히 제주 노마드 커뮤니티가 활발하게 운영되어 네트워킹 기회도 풍부합니다.',
    highlights: ['천혜의 자연환경', '활발한 노마드 커뮤니티', '다양한 카페 문화', '온화한 기후'],
    coworkingSpaces: 15,
    cafesCount: 200,
    averageRent: 800000,
    transportScore: 3,
    safetyScore: 5,
  },
  'busan-haeundae': {
    id: 'busan-haeundae',
    description:
      '해운대는 부산의 대표적인 해변 지역으로, 도시의 편리함과 바다의 여유로움을 동시에 누릴 수 있는 곳입니다. 빠른 인터넷 속도와 잘 갖춰진 인프라, 그리고 다양한 먹거리가 매력적입니다. 서울에서 KTX로 2시간 30분이면 도착할 수 있어 접근성도 좋습니다.',
    highlights: ['해변과 도시의 조화', '빠른 인터넷', '풍부한 맛집', 'KTX 접근성'],
    coworkingSpaces: 12,
    cafesCount: 150,
    averageRent: 700000,
    transportScore: 5,
    safetyScore: 4,
  },
  gangneung: {
    id: 'gangneung',
    description:
      '강릉은 동해안의 대표적인 도시로, 커피로 유명한 안목해변 커피거리가 있습니다. 조용하고 여유로운 분위기에서 집중력 있게 일할 수 있으며, 주말에는 경포대와 주문진 등 아름다운 해변을 즐길 수 있습니다. 최근 노마드들 사이에서 인기가 높아지고 있습니다.',
    highlights: ['커피 문화의 성지', '조용한 작업 환경', '아름다운 해변', '합리적인 생활비'],
    coworkingSpaces: 5,
    cafesCount: 120,
    averageRent: 500000,
    transportScore: 3,
    safetyScore: 5,
  },
  sokcho: {
    id: 'sokcho',
    description:
      '속초는 설악산과 동해바다를 모두 품은 자연 친화적인 도시입니다. 신선한 해산물과 아름다운 자연경관이 매력적이며, 최근 젊은 층을 겨냥한 카페와 게스트하우스가 늘어나고 있습니다. 조용히 집중해서 일하고 싶은 노마드에게 추천합니다.',
    highlights: ['설악산 접근성', '신선한 해산물', '자연 친화적', '조용한 환경'],
    coworkingSpaces: 3,
    cafesCount: 60,
    averageRent: 450000,
    transportScore: 2,
    safetyScore: 5,
  },
  jeonju: {
    id: 'jeonju',
    description:
      '전주는 한옥마을과 비빔밥으로 유명한 전통 문화 도시입니다. 아름다운 한옥 건축물 사이에서 일하는 특별한 경험을 할 수 있으며, 맛있는 음식과 합리적인 생활비가 장점입니다. 문화와 예술을 사랑하는 노마드에게 특히 추천합니다.',
    highlights: ['한옥마을 문화', '맛집 천국', '합리적인 물가', '문화 예술 도시'],
    coworkingSpaces: 8,
    cafesCount: 100,
    averageRent: 400000,
    transportScore: 4,
    safetyScore: 5,
  },
  gyeongju: {
    id: 'gyeongju',
    description:
      '경주는 천년 고도로서 역사적인 유적지가 곳곳에 있는 도시입니다. 조용하고 평화로운 분위기에서 일할 수 있으며, 자전거로 도시 전체를 탐험할 수 있습니다. 역사와 문화를 좋아하는 노마드에게 영감을 줄 수 있는 곳입니다.',
    highlights: ['역사 문화 도시', '자전거 친화적', '조용한 환경', '저렴한 생활비'],
    coworkingSpaces: 4,
    cafesCount: 70,
    averageRent: 350000,
    transportScore: 3,
    safetyScore: 5,
  },
  yeosu: {
    id: 'yeosu',
    description:
      '여수는 아름다운 야경과 바다로 유명한 남해안의 보석 같은 도시입니다. 여수 밤바다 노래로 유명해진 이 도시는 해안선을 따라 펼쳐진 카페와 레스토랑이 매력적입니다. 케이블카에서 바라보는 전경은 일하는 피로를 잊게 해줍니다.',
    highlights: ['아름다운 야경', '바다 전망', '케이블카', '해산물 맛집'],
    coworkingSpaces: 6,
    cafesCount: 80,
    averageRent: 450000,
    transportScore: 3,
    safetyScore: 5,
  },
  'daejeon-yuseong': {
    id: 'daejeon-yuseong',
    description:
      '대전 유성구는 대덕연구단지와 KAIST가 있는 과학기술 중심 도시입니다. 빠른 인터넷과 잘 갖춰진 IT 인프라, 온천으로 유명한 휴양 시설이 있습니다. 기술 스타트업과 연구원들이 많아 네트워킹 기회도 풍부합니다.',
    highlights: ['IT 인프라 최고', '온천 휴양', '연구단지 네트워킹', '중심 위치'],
    coworkingSpaces: 10,
    cafesCount: 90,
    averageRent: 450000,
    transportScore: 4,
    safetyScore: 5,
  },
  chuncheon: {
    id: 'chuncheon',
    description:
      '춘천은 호수와 산으로 둘러싸인 강원도의 수도입니다. 닭갈비와 막국수가 유명하며, 소양강과 의암호의 아름다운 경치를 즐길 수 있습니다. 서울에서 ITX로 1시간이면 도착할 수 있어 주말 서울 방문도 편리합니다.',
    highlights: ['호수 도시', '닭갈비 맛집', '서울 접근성', '자연환경'],
    coworkingSpaces: 5,
    cafesCount: 70,
    averageRent: 400000,
    transportScore: 4,
    safetyScore: 5,
  },
  daegu: {
    id: 'daegu',
    description:
      '대구는 대한민국 제3의 도시로, 도심 속 다양한 카페와 문화 시설이 잘 갖춰져 있습니다. 여름은 덥지만 사계절 뚜렷한 날씨와 합리적인 물가가 장점입니다. 동성로와 김광석 다시 그리기 길 등 볼거리도 풍부합니다.',
    highlights: ['대도시 인프라', '합리적인 물가', '문화 시설', '교통 편리'],
    coworkingSpaces: 15,
    cafesCount: 180,
    averageRent: 450000,
    transportScore: 5,
    safetyScore: 4,
  },
  gwangju: {
    id: 'gwangju',
    description:
      '광주는 예술과 문화의 도시로, 국립아시아문화전당을 중심으로 다양한 문화 행사가 열립니다. 맛있는 음식과 따뜻한 인심으로 유명하며, 창작 활동을 하는 노마드에게 영감을 줄 수 있는 도시입니다.',
    highlights: ['예술 문화 도시', '맛의 고장', '따뜻한 인심', '창작 환경'],
    coworkingSpaces: 8,
    cafesCount: 100,
    averageRent: 400000,
    transportScore: 4,
    safetyScore: 5,
  },
  suwon: {
    id: 'suwon',
    description:
      '수원은 유네스코 세계문화유산인 화성을 품고 있는 경기도의 대표 도시입니다. 서울과 가까우면서도 상대적으로 저렴한 생활비, 빠른 인터넷, 다양한 편의시설이 장점입니다. 삼성전자 본사가 있어 IT 인프라가 잘 갖춰져 있습니다.',
    highlights: ['서울 접근성', 'IT 인프라', '화성 관광', '다양한 편의시설'],
    coworkingSpaces: 12,
    cafesCount: 150,
    averageRent: 600000,
    transportScore: 5,
    safetyScore: 4,
  },
  seogwipo: {
    id: 'seogwipo',
    description:
      '서귀포는 제주도 남쪽에 위치한 아름다운 도시로, 한라산과 바다를 동시에 즐길 수 있습니다. 올레길 트레킹과 폭포 관광 등 다양한 자연 체험이 가능하며, 제주시보다 조용하고 여유로운 분위기가 특징입니다.',
    highlights: ['올레길 트레킹', '폭포 관광', '조용한 분위기', '자연 체험'],
    coworkingSpaces: 8,
    cafesCount: 90,
    averageRent: 700000,
    transportScore: 2,
    safetyScore: 5,
  },
  pohang: {
    id: 'pohang',
    description:
      '포항은 동해안의 일출 명소로 유명한 도시입니다. 호미곶에서 바라보는 일출은 새로운 하루를 시작하는 에너지를 줍니다. 조용하고 한적한 환경에서 집중력 있게 일하고 싶은 노마드에게 추천합니다.',
    highlights: ['일출 명소', '한적한 환경', '저렴한 생활비', '신선한 해산물'],
    coworkingSpaces: 4,
    cafesCount: 50,
    averageRent: 350000,
    transportScore: 3,
    safetyScore: 5,
  },
  tongyeong: {
    id: 'tongyeong',
    description:
      '통영은 한려해상국립공원의 중심에 있는 아름다운 항구 도시입니다. 이순신 장군의 역사가 깃든 곳으로, 예술가들이 사랑하는 도시이기도 합니다. 신선한 해산물과 아름다운 섬 여행을 즐길 수 있습니다.',
    highlights: ['섬 여행', '예술의 도시', '신선한 해산물', '역사 문화'],
    coworkingSpaces: 4,
    cafesCount: 60,
    averageRent: 400000,
    transportScore: 2,
    safetyScore: 5,
  },
  andong: {
    id: 'andong',
    description:
      '안동은 한국의 전통 문화를 가장 잘 보존하고 있는 도시입니다. 하회마을과 도산서원 등 유네스코 세계문화유산이 있으며, 조용하고 전통적인 분위기에서 일할 수 있습니다. 가장 저렴한 생활비로 알뜰한 노마드 라이프가 가능합니다.',
    highlights: ['전통 문화 체험', '최저 생활비', '조용한 환경', '유네스코 유산'],
    coworkingSpaces: 2,
    cafesCount: 40,
    averageRent: 300000,
    transportScore: 2,
    safetyScore: 5,
  },
};

export const cityReviews: Record<string, CityReview[]> = {
  jeju: [
    {
      id: 'jeju-1',
      cityId: 'jeju',
      rating: 5,
      content:
        '제주에서 3개월 살면서 인생 최고의 시간을 보냈어요. 아침에 바다를 보며 산책하고, 카페에서 일하고, 저녁에는 노을을 보는 일상이 정말 행복했습니다. 노마드 모임도 자주 있어서 좋은 사람들도 많이 만났어요.',
      author: '김지수',
      job: '프론트엔드 개발자',
      stayDuration: '3개월',
      createdAt: '2024-01-15',
      pros: ['자연환경이 최고', '노마드 커뮤니티 활발'],
      cons: ['대중교통 불편'],
    },
    {
      id: 'jeju-2',
      cityId: 'jeju',
      rating: 4,
      content:
        '제주의 카페 퀄리티가 정말 높아요. 어디를 가도 분위기 좋고 인터넷도 빠른 카페가 많습니다. 다만 렌트카가 없으면 이동이 조금 불편할 수 있어요.',
      author: '박민준',
      job: 'UX 디자이너',
      stayDuration: '1개월',
      createdAt: '2024-02-20',
      pros: ['카페 퀄리티 높음', '공기 좋음'],
      cons: ['렌트카 필수', '물가 비쌈'],
    },
    {
      id: 'jeju-3',
      cityId: 'jeju',
      rating: 5,
      content:
        '원격근무 천국이에요! 코워킹 스페이스도 많고, 한 달 살기 하기 딱 좋은 곳입니다. 특히 성산일출봉 근처가 조용하고 집중하기 좋았어요.',
      author: '이서연',
      job: '콘텐츠 마케터',
      stayDuration: '2개월',
      createdAt: '2024-03-10',
      pros: ['원격근무 최적화', '다양한 숙소 옵션'],
      cons: ['여름 관광객 많음'],
    },
  ],
  'busan-haeundae': [
    {
      id: 'busan-1',
      cityId: 'busan-haeundae',
      rating: 5,
      content:
        '해운대에서 일하는 건 정말 럭셔리해요. 아침에 바다에서 수영하고, 점심부터 카페에서 일하고, 저녁에는 회 먹으러 가는 루틴이 너무 좋았습니다.',
      author: '최준혁',
      job: '백엔드 개발자',
      stayDuration: '6개월',
      createdAt: '2024-01-20',
      pros: ['도시와 바다의 조화', '맛집 많음'],
      cons: ['여름 피서객 많음'],
    },
    {
      id: 'busan-2',
      cityId: 'busan-haeundae',
      rating: 4,
      content:
        '인터넷 속도가 정말 빨라서 화상회의도 문제없어요. 센텀시티 쪽에 코워킹 스페이스도 잘 되어 있고, 서울 가는 KTX도 자주 있어서 출장 다니기도 편해요.',
      author: '정다은',
      job: '프로덕트 매니저',
      stayDuration: '4개월',
      createdAt: '2024-02-15',
      pros: ['빠른 인터넷', 'KTX 접근성'],
      cons: ['숙소비 비쌈'],
    },
    {
      id: 'busan-3',
      cityId: 'busan-haeundae',
      rating: 5,
      content:
        '부산 사투리 들으면서 일하는 재미가 있어요 ㅎㅎ 사람들이 정도 많고, 돼지국밥부터 밀면까지 먹을 게 너무 많아서 살이 쪘어요.',
      author: '한상우',
      job: '데이터 분석가',
      stayDuration: '2개월',
      createdAt: '2024-03-05',
      pros: ['친절한 사람들', '다양한 음식'],
      cons: ['여름 습함'],
    },
  ],
  gangneung: [
    {
      id: 'gangneung-1',
      cityId: 'gangneung',
      rating: 5,
      content:
        '강릉 커피거리에서 한 달 살기 했는데, 매일 다른 카페를 돌아다니는 재미가 있었어요. 바다도 가깝고 커피도 맛있고, 조용히 일하기 딱 좋은 곳이에요.',
      author: '김태희',
      job: '프리랜서 작가',
      stayDuration: '1개월',
      createdAt: '2024-01-25',
      pros: ['커피 문화 최고', '조용한 환경'],
      cons: ['겨울 추움'],
    },
    {
      id: 'gangneung-2',
      cityId: 'gangneung',
      rating: 4,
      content:
        '경포대 근처에서 지내면서 아침마다 해변 산책했어요. 관광지 느낌도 있지만 평일에는 조용해서 집중하기 좋았습니다. 다만 인터넷이 카페마다 차이가 있어요.',
      author: '이준호',
      job: '소프트웨어 엔지니어',
      stayDuration: '3주',
      createdAt: '2024-02-28',
      pros: ['해변 접근성', '합리적인 물가'],
      cons: ['인터넷 속도 편차'],
    },
    {
      id: 'gangneung-3',
      cityId: 'gangneung',
      rating: 5,
      content:
        '안목해변 카페에서 바다를 보며 일하는 건 정말 힐링이에요. 순두부도 맛있고, 주말에는 주문진 시장 구경도 할 수 있어서 좋았어요.',
      author: '박소영',
      job: '그래픽 디자이너',
      stayDuration: '2개월',
      createdAt: '2024-03-15',
      pros: ['바다 뷰 카페', '맛있는 음식'],
      cons: ['대중교통 제한적'],
    },
  ],
  sokcho: [
    {
      id: 'sokcho-1',
      cityId: 'sokcho',
      rating: 4,
      content:
        '설악산 등산하고 온천 즐기고, 아바이마을에서 오징어순대 먹고... 일과 여행을 동시에 하기 좋은 곳이에요. 다만 코워킹 스페이스는 아직 부족해요.',
      author: '강민정',
      job: '콘텐츠 크리에이터',
      stayDuration: '2주',
      createdAt: '2024-02-10',
      pros: ['자연환경 최고', '신선한 해산물'],
      cons: ['코워킹 스페이스 부족'],
    },
    {
      id: 'sokcho-2',
      cityId: 'sokcho',
      rating: 5,
      content:
        '조용히 집중해서 일하고 싶을 때 속초만한 곳이 없어요. 관광객도 강릉보다 적고, 물가도 저렴하고, 무엇보다 공기가 너무 좋아요.',
      author: '윤서준',
      job: '웹 개발자',
      stayDuration: '1개월',
      createdAt: '2024-03-01',
      pros: ['조용한 환경', '저렴한 물가'],
      cons: ['교통 불편'],
    },
    {
      id: 'sokcho-3',
      cityId: 'sokcho',
      rating: 4,
      content:
        '겨울에 갔는데 눈 내리는 설악산 보면서 일하니까 기분이 묘하게 좋았어요. 난방비가 좀 나오긴 했지만 그만한 가치가 있었습니다.',
      author: '조은비',
      job: '마케터',
      stayDuration: '3주',
      createdAt: '2024-01-30',
      pros: ['겨울 풍경', '힐링 환경'],
      cons: ['겨울 난방비'],
    },
  ],
  jeonju: [
    {
      id: 'jeonju-1',
      cityId: 'jeonju',
      rating: 5,
      content:
        '한옥마을 근처에서 한 달 살기 했는데, 매일이 여행 같았어요. 맛있는 음식도 많고, 한옥 스테이에서 지내니까 기분이 색달랐습니다.',
      author: '신유진',
      job: '프리랜서 번역가',
      stayDuration: '1개월',
      createdAt: '2024-02-05',
      pros: ['맛집 천국', '문화 체험'],
      cons: ['주말 관광객 많음'],
    },
    {
      id: 'jeonju-2',
      cityId: 'jeonju',
      rating: 4,
      content:
        '비빔밥, 콩나물국밥, 막걸리... 먹을 게 너무 많아서 다이어트는 포기했어요 ㅋㅋ 카페도 예쁜 곳이 많고, 생활비가 정말 저렴해요.',
      author: '임재현',
      job: 'iOS 개발자',
      stayDuration: '2개월',
      createdAt: '2024-03-20',
      pros: ['저렴한 생활비', '맛있는 음식'],
      cons: ['여름 더움'],
    },
    {
      id: 'jeonju-3',
      cityId: 'jeonju',
      rating: 5,
      content:
        '전주는 정말 살기 좋은 도시예요. 적당한 규모에 모든 게 다 있고, 사람들도 친절하고, 무엇보다 음식이 너무 맛있어요!',
      author: '배수현',
      job: 'UI 디자이너',
      stayDuration: '3개월',
      createdAt: '2024-01-10',
      pros: ['적당한 도시 규모', '친절한 주민'],
      cons: ['대중교통 제한적'],
    },
  ],
  gyeongju: [
    {
      id: 'gyeongju-1',
      cityId: 'gyeongju',
      rating: 4,
      content:
        '역사 덕후로서 경주는 천국이었어요. 점심에 불국사 가고, 저녁에 동궁과 월지 야경 보고... 일할 때는 조용한 카페에서 집중하고요.',
      author: '송민기',
      job: '역사 콘텐츠 작가',
      stayDuration: '1개월',
      createdAt: '2024-02-25',
      pros: ['역사 유적 풍부', '조용한 환경'],
      cons: ['젊은 층 적음'],
    },
    {
      id: 'gyeongju-2',
      cityId: 'gyeongju',
      rating: 4,
      content:
        '자전거 타고 돌아다니기 너무 좋아요. 대릉원 주변으로 자전거 길이 잘 되어 있어서 점심때 라이딩하고 오후에 일하는 루틴이 최고였어요.',
      author: '황지원',
      job: '프로덕트 디자이너',
      stayDuration: '3주',
      createdAt: '2024-03-08',
      pros: ['자전거 친화적', '저렴한 물가'],
      cons: ['카페 선택지 적음'],
    },
    {
      id: 'gyeongju-3',
      cityId: 'gyeongju',
      rating: 5,
      content:
        '생각보다 경주가 노마드하기 좋은 도시더라고요. 조용하고 평화로워서 집중이 잘 되고, 생활비도 정말 저렴해요.',
      author: '오세진',
      job: '백엔드 개발자',
      stayDuration: '2개월',
      createdAt: '2024-01-18',
      pros: ['평화로운 분위기', '최저 생활비'],
      cons: ['밤 문화 없음'],
    },
  ],
  yeosu: [
    {
      id: 'yeosu-1',
      cityId: 'yeosu',
      rating: 5,
      content:
        '여수 밤바다 진짜 예뻐요... 저녁에 낭만포차에서 회 먹으면서 바다 보는 게 일상이 되니까 퇴근 후가 너무 행복했어요.',
      author: '정하늘',
      job: '데이터 사이언티스트',
      stayDuration: '2개월',
      createdAt: '2024-02-18',
      pros: ['아름다운 야경', '해산물 맛집'],
      cons: ['교통 불편'],
    },
    {
      id: 'yeosu-2',
      cityId: 'yeosu',
      rating: 4,
      content:
        '케이블카 타고 내려다보는 여수 전경이 일할 의욕을 북돋아줘요. 섬 투어도 다양하게 할 수 있어서 주말이 기대되는 곳이에요.',
      author: '김나연',
      job: '영상 편집자',
      stayDuration: '1개월',
      createdAt: '2024-03-12',
      pros: ['섬 투어', '케이블카 전망'],
      cons: ['인터넷 속도 평균'],
    },
    {
      id: 'yeosu-3',
      cityId: 'yeosu',
      rating: 5,
      content:
        '여수는 작지만 매력 있는 도시예요. 걸어 다닐 수 있는 거리에 볼거리 먹거리가 다 있고, 바다 앞 카페에서 일하는 맛이 있어요.',
      author: '이동현',
      job: '풀스택 개발자',
      stayDuration: '6주',
      createdAt: '2024-01-28',
      pros: ['컴팩트한 도시', '바다 전망 카페'],
      cons: ['코워킹 스페이스 적음'],
    },
  ],
  'daejeon-yuseong': [
    {
      id: 'daejeon-1',
      cityId: 'daejeon-yuseong',
      rating: 4,
      content:
        '대덕연구단지 근처라 IT 인프라가 정말 좋아요. 빠른 인터넷은 기본이고, 스타트업 행사도 자주 열려서 네트워킹하기 좋았어요.',
      author: '권도윤',
      job: '스타트업 창업자',
      stayDuration: '4개월',
      createdAt: '2024-02-08',
      pros: ['IT 인프라 최고', '스타트업 생태계'],
      cons: ['볼거리 적음'],
    },
    {
      id: 'daejeon-2',
      cityId: 'daejeon-yuseong',
      rating: 5,
      content:
        '일하다가 피곤하면 유성 온천 가서 피로 풀고 오는 게 루틴이었어요. 서울, 부산 어디든 KTX로 1시간 반이면 가니까 출장도 편해요.',
      author: '장서영',
      job: 'PM',
      stayDuration: '3개월',
      createdAt: '2024-03-02',
      pros: ['온천 휴양', '교통 허브'],
      cons: ['도시 매력 부족'],
    },
    {
      id: 'daejeon-3',
      cityId: 'daejeon-yuseong',
      rating: 4,
      content:
        '물가가 서울보다 훨씬 저렴한데 인프라는 비슷해서 가성비 최고예요. 대학가 근처라 젊은 분위기도 있고요.',
      author: '최예린',
      job: '그로스 마케터',
      stayDuration: '2개월',
      createdAt: '2024-01-22',
      pros: ['가성비 좋음', '젊은 분위기'],
      cons: ['바다 없음'],
    },
  ],
  chuncheon: [
    {
      id: 'chuncheon-1',
      cityId: 'chuncheon',
      rating: 4,
      content:
        '소양강 보면서 일하는 게 힐링이에요. 닭갈비 먹고 의암호 자전거 타고, 서울 가고 싶으면 ITX 타면 1시간이면 가니까 좋아요.',
      author: '문성준',
      job: '안드로이드 개발자',
      stayDuration: '2개월',
      createdAt: '2024-02-14',
      pros: ['호수 풍경', '서울 접근성'],
      cons: ['겨울 추움'],
    },
    {
      id: 'chuncheon-2',
      cityId: 'chuncheon',
      rating: 5,
      content:
        '춘천은 생각보다 살기 좋은 도시예요. 적당히 조용하고, 적당히 편의시설 있고, 무엇보다 자연이 가까워서 마음이 편해져요.',
      author: '백지은',
      job: '테크 라이터',
      stayDuration: '1개월',
      createdAt: '2024-03-18',
      pros: ['균형 잡힌 환경', '자연 접근성'],
      cons: ['카페 선택지 제한'],
    },
    {
      id: 'chuncheon-3',
      cityId: 'chuncheon',
      rating: 4,
      content:
        '남이섬 근처에서 지냈는데 관광지 느낌이랑 달리 평일에는 조용해요. 막국수 맛집 찾아다니는 재미도 있었고요.',
      author: '유재민',
      job: 'QA 엔지니어',
      stayDuration: '3주',
      createdAt: '2024-01-05',
      pros: ['관광지 접근성', '맛집 많음'],
      cons: ['밤 문화 부족'],
    },
  ],
  daegu: [
    {
      id: 'daegu-1',
      cityId: 'daegu',
      rating: 4,
      content:
        '대구는 생각보다 카페가 정말 많아요. 동성로 쪽에 분위기 좋은 곳도 많고, 김광석 다시 그리기 길도 산책하기 좋았어요.',
      author: '서민지',
      job: 'UX 리서처',
      stayDuration: '2개월',
      createdAt: '2024-02-22',
      pros: ['카페 많음', '문화 거리'],
      cons: ['여름 매우 더움'],
    },
    {
      id: 'daegu-2',
      cityId: 'daegu',
      rating: 5,
      content:
        '서울에서 KTX 1시간 40분이면 오고, 물가는 훨씬 저렴하고, 대도시 인프라는 다 있어서 노마드하기 딱 좋아요.',
      author: '안준서',
      job: '풀스택 개발자',
      stayDuration: '4개월',
      createdAt: '2024-03-25',
      pros: ['대도시 인프라', '저렴한 물가'],
      cons: ['관광 명소 적음'],
    },
    {
      id: 'daegu-3',
      cityId: 'daegu',
      rating: 4,
      content:
        '대구 사람들이 정이 많아요. 단골 카페에서 일하다 보니 사장님이랑도 친해지고, 로컬 맛집 추천도 많이 받았어요.',
      author: '홍수아',
      job: '콘텐츠 디렉터',
      stayDuration: '3개월',
      createdAt: '2024-01-12',
      pros: ['정 많은 사람들', '로컬 맛집'],
      cons: ['분지라 공기 정체'],
    },
  ],
  gwangju: [
    {
      id: 'gwangju-1',
      cityId: 'gwangju',
      rating: 5,
      content:
        '광주는 예술의 도시답게 영감을 주는 곳이 많아요. 국립아시아문화전당에서 전시 보고, 양림동 골목 걸으면서 아이디어 얻고요.',
      author: '고예진',
      job: '그래픽 디자이너',
      stayDuration: '2개월',
      createdAt: '2024-02-28',
      pros: ['예술 문화 풍부', '영감 주는 도시'],
      cons: ['서울에서 멀음'],
    },
    {
      id: 'gwangju-2',
      cityId: 'gwangju',
      rating: 4,
      content:
        '광주 음식이 정말 맛있어요. 특히 떡갈비와 육전이 최고! 물가도 저렴하고 사람들도 따뜻해서 적응하기 쉬웠어요.',
      author: '남지훈',
      job: 'DevOps 엔지니어',
      stayDuration: '1개월',
      createdAt: '2024-03-15',
      pros: ['맛의 고장', '따뜻한 인심'],
      cons: ['대중교통 제한'],
    },
    {
      id: 'gwangju-3',
      cityId: 'gwangju',
      rating: 5,
      content:
        '광주는 창작하는 사람들에게 추천해요. 예술가들도 많고, 창작 공간도 많고, 무엇보다 여유로운 분위기가 좋아요.',
      author: '임수빈',
      job: '일러스트레이터',
      stayDuration: '3개월',
      createdAt: '2024-01-20',
      pros: ['창작 환경', '여유로운 분위기'],
      cons: ['밤 문화 적음'],
    },
  ],
  suwon: [
    {
      id: 'suwon-1',
      cityId: 'suwon',
      rating: 4,
      content:
        '수원은 서울과 가깝지만 물가는 저렴해서 좋아요. 화성 야경 보면서 산책하는 게 퇴근 후 루틴이었는데 너무 좋았어요.',
      author: '전소희',
      job: 'PM',
      stayDuration: '3개월',
      createdAt: '2024-02-12',
      pros: ['서울 접근성', '화성 야경'],
      cons: ['출퇴근 시간 혼잡'],
    },
    {
      id: 'suwon-2',
      cityId: 'suwon',
      rating: 5,
      content:
        '삼성전자 덕분인지 인터넷이 정말 빨라요. 코워킹 스페이스도 잘 되어 있고, 먹거리도 다양해서 지루할 틈이 없어요.',
      author: '조현우',
      job: '머신러닝 엔지니어',
      stayDuration: '4개월',
      createdAt: '2024-03-08',
      pros: ['빠른 인터넷', '다양한 편의시설'],
      cons: ['도시 혼잡'],
    },
    {
      id: 'suwon-3',
      cityId: 'suwon',
      rating: 4,
      content:
        '서울 출퇴근하면서 수원에서 살았는데, 주말에 화성 돌면서 쉬기 좋았어요. 통닭 거리도 유명하고 맛집도 많아요.',
      author: '양다연',
      job: '데이터 분석가',
      stayDuration: '6개월',
      createdAt: '2024-01-25',
      pros: ['문화 유적', '맛집 거리'],
      cons: ['주말 관광객 많음'],
    },
  ],
  seogwipo: [
    {
      id: 'seogwipo-1',
      cityId: 'seogwipo',
      rating: 5,
      content:
        '서귀포는 제주시보다 조용하고 자연이 더 가까워요. 천지연폭포 보고, 올레길 걷고, 감귤 밭 사이로 산책하는 일상이 너무 좋았어요.',
      author: '류하영',
      job: '프리랜서 개발자',
      stayDuration: '2개월',
      createdAt: '2024-02-20',
      pros: ['조용한 환경', '자연 체험'],
      cons: ['번화가 멀음'],
    },
    {
      id: 'seogwipo-2',
      cityId: 'seogwipo',
      rating: 4,
      content:
        '올레길 트레킹하면서 머리 식히고 돌아와서 일하면 집중이 잘 돼요. 다만 카페나 코워킹이 제주시보다 적어서 아쉬워요.',
      author: '손영민',
      job: 'iOS 개발자',
      stayDuration: '1개월',
      createdAt: '2024-03-10',
      pros: ['올레길 접근성', '힐링 환경'],
      cons: ['인프라 부족'],
    },
    {
      id: 'seogwipo-3',
      cityId: 'seogwipo',
      rating: 5,
      content:
        '서귀포 흑돼지가 제주시보다 맛있는 것 같아요 (개인 취향). 조용히 일하고 싶은 분들께 강추합니다!',
      author: '강지민',
      job: '마케팅 매니저',
      stayDuration: '6주',
      createdAt: '2024-01-15',
      pros: ['맛있는 음식', '평화로운 분위기'],
      cons: ['교통 불편'],
    },
  ],
  pohang: [
    {
      id: 'pohang-1',
      cityId: 'pohang',
      rating: 4,
      content:
        '호미곶에서 일출 보고 하루를 시작하면 기분이 달라져요. 물회도 맛있고, 조용히 집중해서 일하기 좋은 도시예요.',
      author: '신동현',
      job: '백엔드 개발자',
      stayDuration: '1개월',
      createdAt: '2024-02-05',
      pros: ['일출 명소', '신선한 해산물'],
      cons: ['카페 적음'],
    },
    {
      id: 'pohang-2',
      cityId: 'pohang',
      rating: 4,
      content:
        '포항은 관광지 느낌이 별로 없어서 로컬 라이프 즐기기 좋아요. 생활비도 정말 저렴하고, 바다도 가깝고요.',
      author: '오지현',
      job: '테크니컬 라이터',
      stayDuration: '3주',
      createdAt: '2024-03-20',
      pros: ['로컬 라이프', '저렴한 물가'],
      cons: ['젊은 층 적음'],
    },
    {
      id: 'pohang-3',
      cityId: 'pohang',
      rating: 3,
      content:
        '솔직히 노마드 인프라는 부족해요. 하지만 정말 조용하게 혼자 일하고 싶은 분에게는 추천합니다.',
      author: '정우진',
      job: 'QA 엔지니어',
      stayDuration: '2주',
      createdAt: '2024-01-30',
      pros: ['조용한 환경', '일출 뷰'],
      cons: ['노마드 인프라 부족'],
    },
  ],
  tongyeong: [
    {
      id: 'tongyeong-1',
      cityId: 'tongyeong',
      rating: 5,
      content:
        '통영은 숨겨진 보석 같은 도시예요. 동피랑 벽화마을 산책하고, 케이블카 타고, 섬 여행 다니고... 일보다 여행이 더 많았어요 ㅋㅋ',
      author: '차민서',
      job: '영상 크리에이터',
      stayDuration: '1개월',
      createdAt: '2024-02-15',
      pros: ['섬 여행 천국', '아름다운 풍경'],
      cons: ['교통 불편'],
    },
    {
      id: 'tongyeong-2',
      cityId: 'tongyeong',
      rating: 4,
      content:
        '통영 충무김밥이랑 꿀빵이 너무 맛있어요. 작은 도시지만 볼거리 먹거리가 많아서 심심하지 않아요.',
      author: '한서윤',
      job: '웹 디자이너',
      stayDuration: '3주',
      createdAt: '2024-03-05',
      pros: ['맛있는 음식', '아기자기한 도시'],
      cons: ['인터넷 속도 보통'],
    },
    {
      id: 'tongyeong-3',
      cityId: 'tongyeong',
      rating: 5,
      content:
        '예술가들이 사랑하는 도시답게 영감 받기 좋아요. 박경리 기념관도 있고, 전혁림 미술관도 있고요.',
      author: '임채원',
      job: '콘텐츠 기획자',
      stayDuration: '2개월',
      createdAt: '2024-01-08',
      pros: ['예술적 영감', '문화 시설'],
      cons: ['코워킹 스페이스 없음'],
    },
  ],
  andong: [
    {
      id: 'andong-1',
      cityId: 'andong',
      rating: 4,
      content:
        '안동은 정말 조용해요. 하회마을에서 전통 한옥에 묵으면서 일했는데, 시간이 느리게 가는 느낌이었어요.',
      author: '박태윤',
      job: '프리랜서 작가',
      stayDuration: '2주',
      createdAt: '2024-02-25',
      pros: ['전통 문화 체험', '평화로운 환경'],
      cons: ['편의시설 부족'],
    },
    {
      id: 'andong-2',
      cityId: 'andong',
      rating: 5,
      content:
        '생활비가 진짜 거의 안 들어요. 월 100만원도 안 쓰고 살 수 있어요. 저축하면서 노마드하기 딱 좋은 곳!',
      author: '김유나',
      job: '프론트엔드 개발자',
      stayDuration: '1개월',
      createdAt: '2024-03-12',
      pros: ['최저 생활비', '저축 가능'],
      cons: ['젊은 문화 없음'],
    },
    {
      id: 'andong-3',
      cityId: 'andong',
      rating: 4,
      content:
        '찜닭이랑 간고등어가 정말 맛있어요. 도산서원 근처에서 명상하듯 일하다 보면 마음이 편해져요.',
      author: '이현수',
      job: '소프트웨어 엔지니어',
      stayDuration: '3주',
      createdAt: '2024-01-18',
      pros: ['맛있는 음식', '정신 수양'],
      cons: ['인터넷 속도 느림'],
    },
  ],
};

export function getCityDetail(cityId: string): CityDetail | undefined {
  return cityDetails[cityId];
}

export function getCityReviews(cityId: string): CityReview[] {
  return cityReviews[cityId] || [];
}

export function getRelatedCities(cityId: string, count: number = 4): string[] {
  const currentCity = allCities.find((c) => c.id === cityId);
  if (!currentCity) return [];

  // 점수 계산: 같은 지역 +3점, 공통 태그 1개당 +1점
  const scoredCities = allCities
    .filter((city) => city.id !== cityId)
    .map((city) => {
      let score = 0;

      // 같은 지역이면 +3점
      if (city.region === currentCity.region) {
        score += 3;
      }

      // 공통 태그 수만큼 +1점
      const commonTags = city.tags.filter((tag) => currentCity.tags.includes(tag));
      score += commonTags.length;

      return { city, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count);

  return scoredCities.map((item) => item.city.id);
}
