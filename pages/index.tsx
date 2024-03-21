import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  Flex,
  Input,
  Progress,
  Select,
  Space,
  Spin,
  Typography,
  notification,
} from "antd";
import Head from "next/head";
import { EllipsisOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { STATUS_FILTER, STATUS_FILTER_VALUE } from "@/constants";
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
  const [list, setList] = useState<ITodoResponse[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<ITodoResponse[]>([]);
  const [text, setText] = useState<string>("");
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const [progress, setProgress] = useState<number>(0);

  const filterOptions = [
    {
      label: STATUS_FILTER[0],
      value: STATUS_FILTER_VALUE.ALL,
    },
    {
      label: STATUS_FILTER[1],
      value: STATUS_FILTER_VALUE.DONE,
    },
    {
      label: STATUS_FILTER[2],
      value: STATUS_FILTER_VALUE.UNDONE,
    },
  ];

  const fetchTodos = () => {
    fetchTodoList()
      .then((res) => {
        setList(res);
        setDataLoading(false);
      })
      .catch(() => {
        api.error({
          message: "Error",
          description:
            "There was a problem fetching data. Please refresh the page to try again.",
          duration: 0,
        });
      });
  };

  useEffect(() => {
    setDataLoading(true);
    fetchTodos();
  }, []);

  useEffect(() => {
    if (!list) return;
    let filteredList: ITodoResponse[] | undefined = list;
    if (filter === STATUS_FILTER_VALUE.DONE) {
      filteredList = list?.filter((task) => task.isDone === true);
    } else if (filter === STATUS_FILTER_VALUE.UNDONE) {
      filteredList = list?.filter((task) => task.isDone === false);
    } else {
      filteredList = list;
    }
    setFilteredTodos(filteredList);
  }, [filter, list]);

  const handleAddTodo = () => {
    setSubmitLoading(true);
    if (text === "") {
      api.error({
        message: "Please fill out the to-do field.",
        duration: 2,
      });
      setSubmitLoading(false);
    } else {
      createTodoItem({ text: text })
        .then(() => {
          setText("");
          fetchTodos();
          setSubmitLoading(false);
        })
        .catch(() => {
          setSubmitLoading(false);
          api.error({
            message: "Error",
            description:
              "There was a problem with adding to-do item. Please try again.",
            duration: 2,
          });
        });
    }
  };

  const handleCheckedStatus = (id: string) => {
    setDataLoading(true);
    markUnmarkTodoItem(id)
      .then(() => {
        fetchTodos();
      })
      .catch(() => {
        api.error({
          message: "Error",
          description: "Unable to update task. Please try again.",
          duration: 2,
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
          description: "Unable to delete task. Please try again.",
          duration: 2,
        });
      });
  };

  useEffect(() => {
    const todoTotal = list?.length || 0;
    const doneTodo = list?.filter((task) => task.isDone === true).length || 0;

    setProgress((doneTodo / todoTotal) * 100);
  }, [list]);

  return (
    <>
      <Head>
        <title>To Do List</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      {contextHolder}
      <div className="mih-svh p-2 md:py-20">
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
            <Spin spinning={dataLoading}>
              <Space direction="vertical" className="w-full" size="middle">
                {filteredTodos?.map((item: ITodoResponse) => (
                  <Flex
                    key={item._id}
                    justify="space-between"
                    align="center"
                    className="bg-white h-12 rounded-3xl px-5"
                  >
                    <Checkbox
                      onChange={() => handleCheckedStatus(item._id)}
                      defaultChecked={item.isDone}
                    >
                      <Text
                        className={`${
                          item.isDone
                            ? "text-grey-4 line-through"
                            : "text-black"
                        }`}
                      >
                        {item?.text}
                      </Text>
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
                            key: 0,
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
              </Space>
            </Spin>
          </Space>
        </Card>
      </div>
    </>
  );
}
