package com.Codefellas.sinhalaGPT.Query;

import com.Codefellas.sinhalaGPT.User.User;
import com.Codefellas.sinhalaGPT.User.UserRepository;
import com.Codefellas.sinhalaGPT.mAIBot.Bot;
import com.Codefellas.sinhalaGPT.mAIBot.BotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QueryService {

    private final UserRepository userRepository;
    private final BotRepository botRepository;
    private final QueryRepository queryRepository;

    public List<QueryResponse> saveQuery(String id, String queryId, QueryRequest queryRequest) {
        Optional<User> userOptional = userRepository.findById(id);
        if (!userOptional.isPresent()) {
            return null;
        }

        User user = userOptional.get();
        String answer = "Connection Error";

        Optional<Bot> bot = botRepository.findByQuestion(queryRequest.getQuestion().trim().toLowerCase());
        if (bot.isPresent() && bot.get().getAnswer() != null) {
            answer = bot.get().getAnswer();
        }

        QueryRequest queryRequest2 = QueryRequest.builder()
                .answer(answer)
                .question(queryRequest.getQuestion())
                .build();

        List<QueryResponse> queryResponseList = new ArrayList<>();

        List<Query> userQueries = user.getQuery();
        if (userQueries == null) {
            userQueries = new ArrayList<>();
            user.setQuery(userQueries);
        }

        boolean foundMatchingQuery = false;

        for (Query query : userQueries) {
            if (query != null && query.getDate() != null  && Objects.equals(query.getId(), queryId)) {
                query.getQueryRequestList().add(queryRequest2);
                queryRepository.save(query);
                userRepository.save(user);
                for (QueryRequest queryReq : query.getQueryRequestList()) {
                    QueryResponse queryResponse = QueryResponse.builder()
                            .question(queryReq.getQuestion())
                            .answer(queryReq.getAnswer())
                            .build();
                    queryResponseList.add(queryResponse);
                }
                foundMatchingQuery = true;
                break;
            }
        }

        if (!foundMatchingQuery) {
            List<QueryRequest> newQueryRequestList = new ArrayList<>();
            newQueryRequestList.add(queryRequest2);
            Query newQuery = Query.builder()
                    .id(queryId)
                    .date(LocalDate.now())
                    .queryRequestList(newQueryRequestList)
                    .build();
            userQueries.add(newQuery);
            queryRepository.save(newQuery);
            userRepository.save(user);
            for (QueryRequest queryReq : newQueryRequestList) {
                QueryResponse queryResponse = QueryResponse.builder()
                        .question(queryReq.getQuestion())
                        .answer(queryReq.getAnswer())
                        .build();
                queryResponseList.add(queryResponse);
            }
        }

        return queryResponseList;
    }

    public QueryResponses getAllQuery(String id) {
        Optional<User> user = userRepository.findById(id);

        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);
        LocalDate previous7Days = today.minusDays(7);
        List<Query> toDayList = new ArrayList<>();
        List<Query> yesterDayList = new ArrayList<>();
        List<Query> before7List = new ArrayList<>();

        if (user.isPresent()) {
            for (Query query : user.get().getQuery()) {

                if (query.getDate().equals(today)) {
                   toDayList.add(query);
                }
                if (query.getDate().equals(yesterday)) {
                    yesterDayList.add(query);
                }
                if (query.getDate().isAfter(previous7Days) && query.getDate().isBefore(today)) {
                   before7List.add(query);
                }
            }
            return QueryResponses.builder()
                    .yesterday(yesterDayList)
                    .Today(toDayList)
                    .before7(before7List)
                    .build();
        }
        return null;
    }
}
