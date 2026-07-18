import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 2, // Number of virtual users
    duration: '30s', // Duration of the test
};

export default function () {
    let response = http.get('https://quickpizza.grafana.com''); // Replace with your API endpoint

    check(response, {
        'status is 200': (r) => r.status === 200,
    });

    sleep(1);
}
