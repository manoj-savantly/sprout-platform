import React, { useState } from 'react';
import cx from 'classnames';
import { MenuDto } from '../../../menuAdminService';
import { TriangleDownIcon, TriangleUpIcon, DeleteIcon } from '@chakra-ui/icons';
import { IconButton, Button } from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';

import './styles.scss';

interface Props {
  menu: MenuDto;
  onUpdate: (menu: MenuDto) => void;
  onDelete?: () => void;
  disableCollapse?: boolean;
  disableDelete?: boolean;
  saveButtonText?: string;
  editorTitle?: string;
}

const MenuItem = (props: Props) => {
  const {
    menu: { name, icon, displayText, url, weight, authorities, children },
    onUpdate,
    onDelete,
    disableCollapse = false,
    disableDelete = false,
    saveButtonText = 'Save',
    editorTitle
  } = props;
  const [collapsed, setCollapsed] = useState(!disableCollapse);

  return (
    <div className={cx('MenuItem')}>
      <div className="MenuItem__header">
        <span>{editorTitle || displayText}</span>
        <div className="MenuItem__header__actions">
          {!disableDelete && (
            <IconButton
              variant="ghost"
              onClick={() => onDelete()}
              aria-label="Delete menu item"
              size="sm"
              icon={<DeleteIcon />}
            />
          )}
          {!disableCollapse && (
            <IconButton
              variant="ghost"
              onClick={() => setCollapsed(!collapsed)}
              aria-label={collapsed ? 'Expand' : 'Collapse'}
              size="sm"
              icon={collapsed ? <TriangleDownIcon /> : <TriangleUpIcon />}
            />
          )}
        </div>
      </div>
      <div className={cx('MenuItem__body', { collapsed })}>
        <div className={cx('MenuItem__body__content')}>
          <Formik
            initialValues={{ name, icon, displayText, url, weight, authorities }}
            onSubmit={async (values: MenuDto) => {
              await onUpdate({ ...values, children });
            }}
          >
            <Form className="MenuItem__body__content__form">
              <label className="MenuItem__body__content__form__item__label">
                <span>Name</span>
                <Field className="MenuItem__body__content__form__item" name="name" type="text" autocomplete="off" />
              </label>
              <label className="MenuItem__body__content__form__item__label">
                <span>Icon</span>
                <Field className="MenuItem__body__content__form__item" name="icon" type="text" autocomplete="off" />
              </label>
              <label className="MenuItem__body__content__form__item__label">
                <span>Display Text</span>
                <Field
                  className="MenuItem__body__content__form__item"
                  name="displayText"
                  type="text"
                  autocomplete="off"
                />
              </label>
              <label className="MenuItem__body__content__form__item__label">
                <span>URL</span>
                <Field className="MenuItem__body__content__form__item" name="url" type="text" autocomplete="off" />
              </label>
              <label className="MenuItem__body__content__form__item__label">
                <span>Weight</span>
                <Field className="MenuItem__body__content__form__item" name="weight" type="number" autocomplete="off" />
              </label>
              <label className="MenuItem__body__content__form__item__label">
                <span>Authorities</span>
                <div
                  className="MenuItem__body__content__form__item__checkboxGroup"
                  role="group"
                  aria-labelledby="checkbox-group"
                >
                  <label>
                    <Field type="checkbox" name="authorities" value="Admin" />
                    Admin
                  </label>
                </div>
              </label>
              <Button type="submit">{saveButtonText}</Button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
