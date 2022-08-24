import { Button, Col, Divider, Form, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../Stores/StoreProvider";
import styles from "./MealsPage.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import { Content, Footer } from "antd/lib/layout/layout";
import SearchBar from "../Components/SearchBar";
import TagItemCard from "../Components/Cards/TagItemCard";
import { Tag } from "../Types/Meal";

interface IMealPageProps {}

const TagsPage = (props: IMealPageProps) => {
    const { uiStore, tagStore } = useStore();
    const [form] = Form.useForm();

    useEffect(() => {
        tagStore.loadTags();
    }, [tagStore]);

    const tagList = () => {
        return tagStore.filteredTags.map((tag: Tag) => {
            return (
                <Col className="tag-item" key={tag.id}>
                    <TagItemCard tag={tag} />
                </Col>
            );
        });
    };

    return (
        <>
            <Content className={styles.content}>
                <SearchBar route="Tags" />
                <Divider style={{ paddingBottom: "20px" }} />
                <Row gutter={[16, 16]}>{tagList()}</Row>
            </Content>
            <Footer className={styles.footer}>
                <div className="floating-button">
                    <Button
                        type="primary"
                        shape="circle"
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={() => uiStore.setShowAddTagModal(true)}
                    />
                </div>
            </Footer>
        </>
    );
};

export default observer(TagsPage);
