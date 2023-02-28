/**
 * 왠만한 mapped Type들은 utility에 다 들어있다.
 * TODO: 코드 보기
 */

//1️⃣ readonly : optional을 사용할 수 있다.
{

  type  Todo = {
    title: string;
    description: string;
    priority: 'high' | 'low';
  };
  

  function display(todo: Readonly<Todo>) {
    // todo.title = 'jaja';
  }

}

// 2️⃣ partial 
{
  type  Todo = {
    title: string;
    description: string;
    priority: 'high' | 'low';
  };

  function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>):Todo {
    return {...todo, ...fieldsToUpdate};
  }

  const todo: Todo = {
    title: 'original title',
    description: 'original title',
    priority: 'high',
  }

  const fieldsToUpdate: Partial<Todo> = {
    title: 'update title',
    priority: 'low',
  }

  console.log(updateTodo(todo, fieldsToUpdate));
}

// 3️⃣ pick : 원하는 프로퍼티만 들어가는 좀 더 제한적인 타입을 만들 수 있다.
{
  type Video = {
    id: string;
    title: string; 
    url: string;
    data: string;
  };

  type VideoMetadata = Pick<Video, 'id' | 'title' >;

  function getVideo(id: string): Video {
    return {
      id,
      title: 'video',
      url: 'https://..',
      data: 'byte-data..',
    }
  }

  function getVideoMetadata(id: string): VideoMetadata {
    return {
      id,
      title: 'video meta title',
    }
  }
}

// 4️⃣ omit : pick과 반대로 빼고자 하는 것을 선택할 수 있다. 
// TODO: 코드 구현사항 이해해보기
// TODO: 강의 질문 보기
{
  type Video = {
    id: string;
    title: string; 
    url: string;
    data: string;
  };

  type VideoMetadata = Omit<Video, 'id' | 'title' >;

  function getVideo(id: string): Video {
    return {
      id,
      title: 'video',
      url: 'https://..',
      data: 'byte-data..',
    }
  }

  function getVideoMetadata(id: string): VideoMetadata {
    return {
      url: 'http://',
      data: 'video meta data',
    }
  }
}

// 5️⃣ recode : 두개의 타입을 하나로 묶을 때?
{
  type PageInfo = {
    title: string;
  };

  type Page = 'home' | 'about' | 'contact';

  const nav: Record<Page, PageInfo> = {
    home: {title: 'Home'},
    about: {title: 'About'},
    contact: {title: 'Contact'},
  }
}