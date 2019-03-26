import React from 'react';
import { Table, Icon, Rating, Popup } from 'semantic-ui-react';

export default function CompanyCell(props) {
  const { logo, rating } = props;

  return (
    <Table.Cell verticalAlign="top">
      <div
        style={{ backgroundImage: 'url(' + logo + ')' }}
        className="company-logo"
        alt="Company's logo"
      />
      <p style={{ margin: '1rem 0 0' }}>
        Rating{' '}
        <Popup
          trigger={
            <Icon
              style={{ marginLeft: '1.3rem' }}
              name="question circle outline"
            />
          }
          content="The Company Rating is based on the ratio of customer complaints a company has received in the past 6 months compared to other companies. The more stars a company has, the lower the complaint ratio."
          position="right center"
        />
      </p>

      {!rating || rating === -1 ? (
        <p>
          <strong>Not Available</strong>
        </p>
      ) : (
        <Rating
          icon="star"
          defaultRating={rating}
          maxRating={5}
          size="small"
          disabled
        />
      )}
    </Table.Cell>
  );
}
