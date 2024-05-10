---
title: "[AI] Open AI, Chat GPT API 연결하기"
excerpt: "Chat GPT API 키 발급과 결제 설정을 경험하며 마주한 여러 문제와 해결책을 공유하고 있습니다. 초기에는 무료로 받은 18달러를 사용하려 했으나, API 호출 시 429 에러의 해결 과정을 보여줍니다. 또한, API 키를 저장하는 방법과 환경 변수 설정에 대한 경험을 공유하고 있으며, OpenAI 라이브러리를 추가하고 JavaScript 코드를 작성하는 과정을 상세히 안내하고 있습니다."
coverImage: "/assets/blog/chatgpt.webp"
date: "2020-03-16T05:35:07.322Z"
ogImage:
  url: "/assets/blog/dynamic-routing/cover.jpg"
---

## **1\. Billing**

[##_Image|kage@PkiFW/btsGVztC6Jh/KKiOsmKWjrkTlaK5MSwk5K/img.png|CDM|1.3|{"originWidth":1060,"originHeight":880,"style":"alignCenter"}_##]

우선 가장 먼저 해야할 일은 API key 발급과 billing method를 연결하는 것입니다.

저는 처음 가입할 때 18$를 무료로 받았고, limit에 18$가 써있었지만 만료된 것인지 API 호출을 해도 429에러를 뱉더라구요. 결국 구글링을 하다 보니, 무료 사용분이 만료되어도 limit에는 사용가능한 것처럼 뜨기도 한다는 것을 알게 되어 결국 card를 연결하고 보증금을 10달러 정도 넣었습니다.

[##_Image|kage@tjN7T/btsGXeothoP/lKGVvBKE4MaPdJkghZnh3K/img.png|CDM|1.3|{"originWidth":470,"originHeight":70,"style":"alignCenter","caption":"api 콜을 할 금액이 없는 경우 뜨는 에러."}_##][##_Image|kage@bL4XJ5/btsGTANXOny/WOEdNP9CjIRBfEvCggB1Zk/img.png|CDM|1.3|{"originWidth":1049,"originHeight":927,"style":"alignCenter","width":733,"height":648,"caption":"비용 limit 설정"}_##]

토이 프로젝트로 연결을 하는 것이라, 가장 최소 금액으로 맞추기 위해 세팅은 이렇게 했습니다. 한 달에10달러가 넘어가면 request가 거절되도록 했어요. (기본 세팅은 $120)

## **2\. API 키 발급**

[https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

API 콜을 하기 위해서는 API키를 파라미터로 함께 전송해야 합니다. 이를 위해서 위 주소에서 key를 발급합니다. 생성할 때 외에 키값을 노출하지 않기 때문에 저는 로컬에 별도의 txt파일로 저장을 해두었어요. 

[##_Image|kage@b768fZ/btsGUQQbQ4f/EdH76KgtKnG4Kz7hWXA0Qk/img.png|CDM|1.3|{"originWidth":211,"originHeight":111,"style":"alignCenter","filename":"blob"}_##][##_Image|kage@cwoCYA/btsGWsU62bh/pxUgLUO3vmvMxM5tHDDqm0/img.png|CDM|1.3|{"originWidth":1054,"originHeight":444,"style":"alignCenter","width":779,"height":328,"caption":"create new secret key를 눌러 생성한 키, 키가 잘 만들어졌다면 이 화면처럼 확인할 수 있어요.","filename":"edited_blob"}_##]

## **3\. openai 라이브러리 추가하고, JavaScript 코드 작성 (node.js)**

[공식 문서](https://platform.openai.com/docs/api-reference/introduction)에 따라 cmd창에 npm으로 라이브러리를 설치해줍니다.

 **npm install openai** 

윈도우의 경우 시스템 환경 변수에 open api key를 추가해주고, mac은 홈브루 등을 이용해서 환경 변수를 추가해요.

[##_Image|kage@bul5nJ/btsGWamMhOg/849rbq9z9zYCxjkl2bJOo0/img.png|CDM|1.3|{"originWidth":1026,"originHeight":671,"style":"alignCenter","width":495,"height":324,"caption":"https://platform.openai.com/docs/quickstart?context=node"}_##]

docs의 [QuickStart페이지](https://platform.openai.com/docs/quickstart?context=node)에서 node로 선택하시면 상세한 명령어와 가이드가 나와있으니, 이대로 따라하면 됩니다.

저는 환경변수가 잘 들어갔는데도 cmd에서 해당 변수를 잘 읽어오지 못하는 문제가 있었기 때문에 코드 내에서 파라미터로 넘겨주는 것으로 해결했습니다. 로컬 환경에서 테스트하는 용도이기 때문에 key를 직접 입력해줬지만, Git hub에 올리거나 배포하게 되면 매우 위험하니 key 노출을 주의해주세요! ([API Key 보안 권장 사항 문서](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety))

시스템 환경변수에 OPEN API KEY가 잘 설정되었다면 아래 코드에서 OpenAI객체 생성할 때 API KEY를 파라미터로 전달하지 않아도 됩니다.

```javascript
import OpenAI from "openai";
const api_key = "!!!"; // 시스템 환경변수 call 안되고 있어서, 직접 변수로 삽입
const openai = new OpenAI({ apiKey: api_key, dangerouslyAllowBrowser: true });
const MODEL = "gpt-3.5-turbo";
const ROLE_PROMPT = `You are a Blog Content Strategy Expert, specialized in creating inspiring content with powerful messages and storytelling. Your task is to generate content ideas for blog posts that people will love. Here is how you will develop inspiring content ideas for blog posting:
  Now, proceed to execute the following task: \"블로그 포스팅을 위한 콘텐츠 아이디어 생성\".
  I prefer to get a response in Korean.
  Take a deep breath and lets work this out in a step by step way to be sure we have the right answer."`;

export async function apiCall({ content_prompt }: { content_prompt: string }) {
  const params: any = {
    messages: [
      { role: "system", content: ROLE_PROMPT },  // GPT에 역할 부여
      { role: "user", content: content_prompt }, // GPT에 요청하는 질문 프롬프트에 해당
    ],
    model: MODEL,
  };

  try {
    const completion = await openai.chat.completions.create(params);
    console.log(completion.choices);
    if (completion) {
      return completion.choices[0].message.content; // 외부 파일에서 함수로 사용하기 위한 return값
    }
  } catch (error) {
    console.error(error);
  }
}
```

```javascript
"use client"; // Next.js를 사용하고 있어서 'use client' 키워드가 사용되었습니다.

import { useState } from "react";
import GptButton from "./gptbutton";
import { apiCall } from "@/api/api";

export default function Draft() {
  const [response, setResponse] = useState("");
  const [userInput, setUserInput] = useState("");
  const handleClick = async () => {
    if (userInput.length === 0) return;
    const res = await apiCall({ content_prompt: userInput }); // api call 함수 호출
    if (res) {
      setResponse(res);
    }
  };

  return (
    <div>
      <textarea
        autoFocus
        value={userInput}
        onChange={(event) => setUserInput(event.target.value)}
      ></textarea>
      <GptButton onClick={handleClick} />
      {response.length !== 0 && <div>{response}</div>}
    </div>
  );
}
```

[##_Image|kage@bgi5E5/btsGUTGgcbL/SrD4nSsJiZEo70OYGiAD3K/img.png|CDM|1.3|{"originWidth":468,"originHeight":476,"style":"alignCenter"}_##]

이런 식으로 유저의 입력값을 gpt의 api 호출 함수의 인자로 보내서 비동기적으로 받아온 응답값을 화면에 간단하게 표시할 수 있었습니다.

[##_Image|kage@b3t5Pi/btsGVbNzNd0/irBM3CB6kcaNC2Jp0jOXJ0/img.png|CDM|1.3|{"originWidth":956,"originHeight":858,"style":"alignCenter","width":733,"height":658}_##]

---

## **Self Feedback**

\[ 서비스 \]

응답 글의 형식이 파괴된 채로 화면에 표시되는 문제가 있어서, 파싱 로직을 보강하거나, 인코딩 과정을 살펴봐야 할 것 같네요.

간단한 질문이어도 API 응답시간이 꽤 길어서 spinner를 추가하고, API 속도를 최적화할 수 있는 다른 방법이 있는지 보강해야 할 것 같습니다.

#### \[ 비용 \]

API를 연결하며 나름 저렴한 "gpt-3.5-turbo" 모델을 사용했는데, 테스트 5건 정도의 호출에 0.01 $가 소모되었네요 😲😲

비개발자 지인들에게 배포하고 싶은 서비스라 로컬 LLM모델로 하는 방법을 알아봐야겠다는 결론을 내렸습니다.