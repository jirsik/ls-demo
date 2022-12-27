import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import SearchPage from './SearchPage';
import { toast } from 'react-toastify';

type MockedAxiosType = { get: jest.MockedFunction<typeof axios.get> };

const resExampleData1 = [
  {
    id: 'EFLWAbMF',
    url: 'alpe-adria-cup',
    gender: {
      id: 1,
      name: 'Men'
    },
    name: 'Alpe Adria Cup',
    type: {
      id: 1,
      name: 'TournamentTemplate'
    },
    participantTypes: null,
    sport: {
      id: 3,
      name: 'Basketball',
      statusId: 1
    },
    favouriteKey: {
      web: '3_6_EFLWAbMF',
      portable: '6_EFLWAbMF'
    },
    flagId: 6,
    defaultCountry: {
      name: 'Europe',
      id: 6
    },
    images: [
      {
        path: 'vJA9cnXI-4ULMcWY7.png',
        usageId: 4,
        variantTypeId: 19
      }
    ],
    teams: null,
    defaultTournament: {
      id: 'vsGLSGnE',
      name: 'Alpe Adria Cup',
      stageWithStatsDataIds: [
        '2ssQ39Je',
        'tYuU2TY1'
      ]
    },
    superTemplate: null
  },
];

const setup = (preventResolvingGet: boolean = false): { mockedAxios: MockedAxiosType; radio2: any; radio3: any; button: any } => {
  axios.get = jest.fn();
  const mockedAxios = axios as unknown as MockedAxiosType;

  if (!preventResolvingGet) {
    mockedAxios.get.mockResolvedValue({
      data: resExampleData1,
    });
  }

  const utils = render(<SearchPage />);

  const radio2 = utils.getByLabelText('Competitions');
  const radio3 = utils.getByLabelText('Participants');
  const input = utils.getByLabelText('Search');
  const button = utils.getByRole('button');

  fireEvent.change(input, { target: { value: 'aa' } });

  return {
    mockedAxios,
    radio2,
    radio3,
    button,
  };
};

test('loadData', async() => {
  const allResultsUrl = 'https://s.livesport.services/api/v2/search?type-ids=1,2,3,4&project-type-id=1&project-id=602&lang-id=1&q=aa&sport-ids=1,2,3,4,5,6,7,8,9';
  const { mockedAxios, button } = setup();

  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText('Alpe Adria Cup')).toBeInTheDocument();
    expect(mockedAxios.get).toBeCalledWith(allResultsUrl);
  });
});

test('loadOnlyCompetitions', async() => {
  const onlyCompetitionUrl = 'https://s.livesport.services/api/v2/search?type-ids=1&project-type-id=1&project-id=602&lang-id=1&q=aa&sport-ids=1,2,3,4,5,6,7,8,9';
  const { mockedAxios, radio2, button } = setup();

  fireEvent.click(radio2);
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText('Alpe Adria Cup')).toBeInTheDocument();
    expect(mockedAxios.get).toBeCalledWith(onlyCompetitionUrl);
  });
});

test('loadOnlyParticipants', async() => {
  const onlyParticipantsUrl = 'https://s.livesport.services/api/v2/search?type-ids=2,3,4&project-type-id=1&project-id=602&lang-id=1&q=aa&sport-ids=1,2,3,4,5,6,7,8,9';
  const { mockedAxios, radio3, button } = setup();

  fireEvent.click(radio3);
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText('Alpe Adria Cup')).toBeInTheDocument();
    expect(mockedAxios.get).toBeCalledWith(onlyParticipantsUrl);
  });
});

test('loadingFails', async() => {
  const { mockedAxios, button } = setup(true);

  toast.error = jest.fn();
  const mockedToast = toast as unknown as { error: jest.MockedFunction<typeof toast.error> };

  mockedAxios.get.mockRejectedValue(null);

  fireEvent.click(button);

  await waitFor(expect(mockedToast.error).toHaveBeenCalled);
});

test('showDetailInModal', async() => {
  const { button } = setup();

  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText('Alpe Adria Cup')).toBeInTheDocument();
  });

  const detailLink = screen.getByText('show detail');
  fireEvent.click(detailLink);

  await waitFor(() => {
    expect(screen.getByText('country: Europe')).toBeInTheDocument();
  });
});
