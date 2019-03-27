import React from 'react';
import { Icon, Popup, Rating, Table } from 'semantic-ui-react';

export default function CompanyCell(props) {
  const { logo, rating } = props;

  return (
    <Table.Cell className="company-cell">
      <div
        style={{ backgroundImage: 'url(' + logo + ')' }}
        className="company-logo"
        alt="Company's logo"
      />
      <div style={{ margin: '1rem 0 0' }}>
        Rating{' '}
        <Popup
          trigger={
            <Icon
              style={{ marginLeft: '.85rem' }}
              name="question circle outline"
            />
          }
          content="The Company Rating is based on the ratio of customer complaints a company has received in the past 6 months compared to other companies. The more stars a company has, the lower the complaint ratio."
          position="right center"
        />
      </div>

      {!rating || rating === -1 ? (
        <p style={{ fontSize: '.75rem' }}>
          <strong>Not Available</strong>
        </p>
      ) : (
        <Rating
          icon="star"
          defaultRating={rating}
          maxRating={5}
          size="tiny"
          disabled
        />
      )}
    </Table.Cell>
  );
}
