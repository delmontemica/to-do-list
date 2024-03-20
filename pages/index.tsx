import {
  Button,
  Card,
  Checkbox,
  ConfigProvider,
  Dropdown,
  Flex,
  Input,
  MenuProps,
  Progress,
  Select,
  Space,
  Typography,
} from "antd";
import Head from "next/head";
const { Title, Text } = Typography;
import { EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
import { STATUS_FILTER } from "@/constants";
import Link from "next/link";

export default function Home() {
  const [filter, setFilter] = useState<number>(0);

  const filterOptions = [
    {
      label: "All",
      value: 0,
    },
    {
      label: "Done",
      value: 1,
    },
    {
      label: "Undone",
      value: 2,
    },
  ];

  const items: MenuProps["items"] = [
    {
      label: (
        <Link href="#" className="text-red-600">
          Delete
        </Link>
      ),
      key: "0",
    },
  ];

  return (
    <>
      <Head>
        <title>Home</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className="h-svh flex flex-col justify-center items-center">
        <Card
          className={`w-auto md:w-[720px] mx-4 md:mx-auto bg-light-0
                        rounded-3xl md:px-14 md:py-8`}
        >
          <Card className="bg-grey-0 rounded-3xl">
            <Title className="text-white text-3xl mb-0">Progress</Title>
            <Progress percent={30} showInfo={false} />
            <Text className="text-white">1 completed</Text>
          </Card>
          <Flex justify="space-between" align="center" className="mt-6 mb-1">
            <Title level={2} className="text-2xl font-medium">
              To-dos
            </Title>
            <Select
              defaultValue={filter}
              options={filterOptions}
              onChange={setFilter}
              className="w-[110px]"
            />
          </Flex>
          <Space direction="vertical" className="w-full" size="middle">
            <Flex className="bg-white h-12 rounded-3xl px-2" align="center">
              <Input
                size="small"
                placeholder="Add your to-do …"
                className="border-none h-8 focus:shadow-none"
              />
              <Button
                type="primary"
                shape="round"
                className="text-sm bg-blue-0"
              >
                Add
              </Button>
            </Flex>
            <Flex
              justify="space-between"
              align="center"
              className="bg-white h-12 rounded-3xl px-5"
            >
              <Checkbox onChange={() => console.log("checked!")}>Test</Checkbox>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <EllipsisOutlined className="text-xl text-grey-5" />
                </a>
              </Dropdown>
            </Flex>
          </Space>
        </Card>
      </div>
    </>
  );
}
