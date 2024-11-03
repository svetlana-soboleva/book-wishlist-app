package com.hobby.bookWishList.book.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GoogleBooksResponse {

    @JsonProperty("items")
    private List<GoogleBookItem> items;

}
