package com.jelly.backend.pojo;

/**
 * Created by user on 2015/6/5.
 */
public class Bulletin {
    private int id;
    private String title;
    private String content;
    private Boolean editing;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean isEditing() {
        return editing;
    }

    public void setEditing(Boolean editing) {
        this.editing = editing;
    }
}
