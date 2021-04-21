import _ from 'lodash';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../types';
import { PrivateComponent } from '../PrivateComponent/PrivateComponent';
import TopSectionItem from './TopSectionItem';

const TopSection: FC<any> = () => {
  const navTree = useSelector((state: StoreState) => state.navTree.items);
  const mainLinks = _.filter(navTree, (item) => !item.hideFromMenu).sort(
    (a, b) => (a?.position || 0) - (b?.position || 0)
  );

  return (
    <div className="sidemenu__top">
      {/* <TopSectionItem link={searchLink} onClick={onOpenSearch} /> */}
      {mainLinks.map((link, index) => {
        const authorities = link.authority ? [link.authority] : [];
        return (
          <PrivateComponent hasAnyAuthority={authorities}>
            <TopSectionItem link={link} key={`${link.id}-${index}`} />
          </PrivateComponent>
        );
      })}
    </div>
  );
};

export default TopSection;
