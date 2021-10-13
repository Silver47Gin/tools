import {
  View,
  Text,
  Image,
  PageContainer,
  Input,
  Button,
  Picker,
} from "@tarojs/components";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { nanoid } from "nanoid/non-secure";
import {
  TodoState,
  todos as todoStore,
  Todos,
  Todo,
} from "@tools/stores/todos";
import { useCallback, useEffect, useMemo, useState } from "react";
import IconFont from "@tools/components/iconfont";
import "./index.scss";

interface TodosProps {
  todos: Todos;
}

const Header = observer(({ todos }: TodosProps) => {
  const now = useMemo(() => dayjs(), []);
  const title = useMemo(() => {
    if (now.isBefore(now.set("hour", 12).set("minute", 0).set("second", 0))) {
      return "早上好~";
    }
    if (now.isBefore(now.set("hour", 20).set("minute", 0).set("second", 0))) {
      return "下午好~";
    }
    return "晚上好~";
  }, [now]);
  return (
    <View className="header">
      <Image
        className="header_img"
        src="https://images.pexels.com/photos/3854608/pexels-photo-3854608.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        mode="widthFix"
      />
      <View className="header_content">
        <View className="header_title header_content_item">
          <Text className="header_title_text_big header_title_text">
            {title}
          </Text>
          <Text className="header_title_text_small header_title_text">
            {dayjs().format("YYYY-MM-DD")}
          </Text>
        </View>
        <View className="header_content_item header_content_item_end">
          <View
            onClick={() =>
              todos.add({
                content: "",
                id: nanoid(),
                status: TodoState.Todo,
                time: dayjs().valueOf(),
              })
            }
          >
            <IconFont name="toolsadd-circle" size={50} color="#ffffff" />
          </View>
        </View>
      </View>
    </View>
  );
});

const colors = ["belizehole", "wisteria", "alizarin", "sunflower"];
const iconSize = 40;

const TodoList = observer(({ todos }: TodosProps) => {
  const [editShow, setEditShow] = useState(false);
  const [content, setContent] = useState("");
  const [time, setTime] = useState("");
  const [editId, setEditId] = useState("");

  const showEdit = useCallback(
    (id: Todo["id"]) => {
      const target = todos.state.find((todo) => todo.id === id);
      setEditShow(true);
      setEditId(id);
      setTime(dayjs(target!.time).format("YYYY-MM-DD"));
      setContent(target!.content);
    },
    [todos.state]
  );

  useEffect(() => {
    todos.load();
  }, [todos]);

  return (
    <View className="todos_container">
      <PageContainer
        show={editShow}
        position="bottom"
        onClickOverlay={() => setEditShow(false)}
      >
        <View className="overlay_header">
          <Text
            className="overlay_header_item"
            onClick={() => setEditShow(false)}
          >
            取消
          </Text>
          <Text
            className="overlay_header_item"
            onClick={() => {
              todos.update(editId, { content });
              setEditShow(false);
            }}
          >
            确定
          </Text>
        </View>
        <View className="overlay_row">
          <Text>内容：</Text>
          <Input
            value={content}
            onInput={(e) => setContent(e.detail.value)}
            placeholder="请输入待办内容"
          />
        </View>
        <View className="overlay_row">
          <Text>时间：</Text>
          <Picker
            mode="time"
            onChange={(e) => setTime(e.detail.value)}
            value={time}
          >
            <Text>当前选择：{time}</Text>
          </Picker>
        </View>
      </PageContainer>
      {todos.state.map((todo, idx) => (
        <View
          key={todo.id}
          className={`todos_card todos_card_${colors[idx % colors.length]}`}
        >
          <Image
            className="todos_card_img"
            src={`https://images.pexels.com/photos/${
              3854600 + idx
            }/pexels-photo-${
              3854600 + idx
            }.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=2500`}
            mode="widthFix"
          />
          <View className="todos_card_left">
            <Text className="todos_card_left_content">{todo.content}</Text>
            <Text className="todos_card_left_time">
              {dayjs(todo.time).format("YYYY-MM-DD hh:mm")}
            </Text>
          </View>
          <View className="todos_card_right">
            <View
              className="todos_card_right_icon"
              onClick={() => showEdit(todo.id)}
            >
              <IconFont name="toolsedit" size={iconSize} color="#ffffff" />
            </View>
            <View
              className="todos_card_right_icon"
              onClick={() => todos.remove(todo.id)}
            >
              <IconFont
                name="toolsdelete-filling"
                size={iconSize}
                color="#ffffff"
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
});

const Index = () => (
  <View className="main">
    <Header todos={todoStore} />
    <TodoList todos={todoStore} />
  </View>
);

export default Index;
