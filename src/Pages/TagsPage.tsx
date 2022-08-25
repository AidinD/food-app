import { Button, Col, Divider, Form, Modal, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../Stores/StoreProvider";
import styles from "./MealsPage.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import { Content, Footer } from "antd/lib/layout/layout";
import SearchBar from "../Components/SearchBar";
import TagItemCard from "../Components/Cards/TagItemCard";
import { Tag } from "../Types/Meal";
import AddTagForm from "../Components/Forms/AddTagForm";
import EditTagForm from "../Components/Forms/EditTagForm";

interface ITagPageProps {}

const TagsPage = (props: ITagPageProps) => {
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
            <Modal
                title="Add tag"
                visible={uiStore.showAddTagModal}
                onOk={form.submit}
                onCancel={() => {
                    form.resetFields();
                    uiStore.setShowAddTagModal(false);
                }}
                okText="Add"
            >
                <AddTagForm form={form} />
            </Modal>
            <Modal
                title="Edit tag"
                visible={uiStore.showEditTagModal}
                okText="Save"
                onOk={form.submit}
                onCancel={() => {
                    form.resetFields();
                    uiStore.setShowEditTagModal(false);
                }}
            >
                <EditTagForm form={form} tag={tagStore.selectedTag!} />
            </Modal>
        </>
    );
};

export default observer(TagsPage);
