import { View, Button } from "@tarojs/components";
import { navigateTo } from "@tarojs/taro";

const Index = () => (
  <View>
    <Button onClick={() => navigateTo({ url: "pages/index/index" })}>
      返回主页
    </Button>
  </View>
);

export default Index;
