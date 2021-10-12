import { View, Text, Image } from "@tarojs/components";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { nanoid } from "nanoid/non-secure";
import { TodoState, todos as todoStore, Todos } from "@tools/stores/todos";
import { useMemo } from "react";
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
  return (
    <View className="todos_container">
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
            <View className="todos_card_right_icon">
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
