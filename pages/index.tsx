import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  Flex,
  Input,
  Progress,
  Select,
  Skeleton,
  Space,
  Typography,
  notification,
} from "antd";
import Head from "next/head";
import { EllipsisOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { STATUS_FILTER } from "@/constants";
import {
  createTodoItem,
  deleteTodoItem,
  fetchTodoList,
  markUnmarkTodoItem,
} from "@/api";
import { ITodoResponse } from "@/types";

const { Title, Text } = Typography;

export default function Home() {
  const [filter, setFilter] = useState<number>(0);
  const [list, setList] = useState<ITodoResponse[]>();
  const [text, setText] = useState<string>("");
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const [progress, setProgress] = useState<number>(0);

  console.log(list?.filter((task) => task.isDone === true).length);

  const filterOptions = [
    {
      label: STATUS_FILTER[0],
      value: 0,
    },
    {
      label: STATUS_FILTER[1],
      value: 1,
    },
    {
      label: STATUS_FILTER[2],
      value: 2,
    },
  ];

  // TODO: Fix error handling.
  const fetchTodos = () => {
    setDataLoading(true);
    fetchTodoList()
      .then((res) => {
        setList(res);
        setDataLoading(false);
      })
      .catch(() => {
        api.error({
          message: "Error",
          description: "Something went wrong. Please try again.",
          duration: 0,
        });
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = () => {
    setSubmitLoading(true);
    createTodoItem({ text: text })
      .then(() => {
        setText("");
        fetchTodos();
        setSubmitLoading(false);
      })
      .catch(() => {
        api.error({
          message: "Error",
          description: "Something went wrong. Please try again.",
          duration: 0,
        });
      });
  };

  const handleCheckedStatus = (id: string) => {
    markUnmarkTodoItem(id)
      .then((res) => {
        console.log("mark res: ", res);
      })
      .catch(() => {
        api.error({
          message: "Error",
          description: "Something went wrong. Please try again.",
          duration: 0,
        });
      });
  };

  const handleDeleteTodo = (id: string) => {
    setDataLoading(true);
    deleteTodoItem(id)
      .then(() => {
        fetchTodos();
      })
      .catch(() => {
        api.error({
          message: "Error",
          description: "Something went wrong. Please try again.",
          duration: 0,
        });
      });
  };

  // TODO: Update progress when a todo is checked/unchecked.
  useEffect(() => {
    const todoTotal = list?.length || 0;
    const doneTodo = list?.filter((task) => task.isDone === true).length || 0;

    setProgress((doneTodo / todoTotal) * 100);
  }, [list]);

  // TODO: Code cleanup.
  return (
    <>
      <Head>
        <title>To Do List</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      {contextHolder}
      <div className="h-svh px-2 py-20">
        <Card
          className={`w-full md:w-[720px] md:mx-auto bg-light-0
                      rounded-3xl md:px-14 md:py-8`}
        >
          <Card className="bg-grey-0 rounded-3xl">
            <Title className="text-white text-3xl mb-0">Progress</Title>
            <Progress percent={progress} showInfo={false} />
            <Text className="text-white">
              {list?.filter((task) => task.isDone === true).length} completed
            </Text>
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
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
              <Button
                type="primary"
                shape="round"
                className="text-sm bg-blue-0"
                onClick={handleAddTodo}
                loading={submitLoading}
              >
                Add
              </Button>
            </Flex>
            {dataLoading ? (
              <>
                <Skeleton.Input
                  active={dataLoading}
                  size="large"
                  className="w-full rounded-3xl h-12"
                />
                <Skeleton.Input
                  active={dataLoading}
                  size="large"
                  className="w-full rounded-3xl h-12"
                />
                <Skeleton.Input
                  active={dataLoading}
                  size="large"
                  className="w-full rounded-3xl h-12"
                />
              </>
            ) : (
              <>
                {list?.map((item: ITodoResponse, index: number) => (
                  <Flex
                    key={index}
                    justify="space-between"
                    align="center"
                    className="bg-white h-12 rounded-3xl px-5"
                  >
                    <Checkbox
                      onChange={() => handleCheckedStatus(item._id)}
                      defaultChecked={item.isDone}
                    >
                      {item?.text}
                    </Checkbox>
                    <Dropdown
                      menu={{
                        items: [
                          {
                            label: (
                              <Button
                                type="text"
                                onClick={() => handleDeleteTodo(item._id)}
                                className="text-red-600 hover:bg-transparent"
                              >
                                Delete
                              </Button>
                            ),
                            key: "0",
                          },
                        ],
                      }}
                      trigger={["click"]}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <EllipsisOutlined className="text-xl text-grey-5" />
                      </a>
                    </Dropdown>
                  </Flex>
                ))}
              </>
            )}
          </Space>
        </Card>
      </div>
    </>
  );
}
